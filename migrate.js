#!/usr/bin/env node

require("dotenv").config();
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { register } = require("ts-node");

// Enable TypeScript execution
register();

// Read database config from .env
const { DB_HOST, DB_USER, DB_PASS, DB_SCHEMA } = process.env;

async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    // Create the database if it does not exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_SCHEMA}\``);
    console.log(`✅ Database '${DB_SCHEMA}' is ready.`);
    
    await connection.end();
}

// Load migration file
const migrations = require(path.join(__dirname, "database/migrations/migrations.ts")).default;

// Database connection
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA,
};

async function runMigrations() {
    await ensureDatabaseExists();

    const connection = await mysql.createConnection(dbConfig);

    for (const migration of migrations) {
        const { tableName, columns } = migration;

        // Check if table exists
        const [tableExists] = await connection.execute(
            `SHOW TABLES LIKE '${tableName}'`
        );

        if (tableExists.length === 0) {
            // Create table
            const columnDefinitions = columns
                .map((col) => `${col.name} ${col.type}`)
                .join(", ");
            const createTableSQL = `CREATE TABLE ${tableName} (${columnDefinitions})`;
            await connection.execute(createTableSQL);
            console.log(`✅ Created table: ${tableName}`);
        } else {
            // Table exists, check for column changes
            const [existingColumns] = await connection.execute(
                `SHOW COLUMNS FROM ${tableName}`
            );
            const existingColumnNames = existingColumns.map((col) => col.Field);
            const migrationColumnNames = columns.map((col) => col.name);

            for (const column of columns) {
                if (!existingColumnNames.includes(column.name)) {
                    // New column detected, ask user if they want to modify
                    const { confirmAdd } = await inquirer.createPromptModule()([
                        {
                            type: "confirm",
                            name: "confirmAdd",
                            message: `Column '${column.name}' does not exist in '${tableName}'. Do you want to add it?`,
                            default: true,
                        },
                    ]);

                    if (confirmAdd) {
                        let defaultValue = column.defaultValue;
                        if (defaultValue === undefined) {
                            // Ask user for default value if not provided
                            const { userDefault } = await inquirer.createPromptModule()([
                                {
                                    type: "input",
                                    name: "userDefault",
                                    message: `Enter default value for column '${column.name}' (or press enter for NULL):`,
                                },
                            ]);
                            // Check if input is empty or should be quoted
                            defaultValue = userDefault.trim() === ""
                            ? "NULL"
                            : isNaN(userDefault) 
                                ? `'${userDefault.replace(/'/g, "''")}'`  // Escape single quotes for safety
                                : userDefault; // If it's a number, don't quote it
                        }

                        if (column.type.includes('DATE') && column.type.includes('NOT NULL')) {
                            defaultValue = `'${new Date(Date.now()).toISOString().slice(0,19).replace("T", " ").replace(/'/g, "''")}'`; // 2025-03-31 12:00:00
                        }

                        const addColumnSQL = `ALTER TABLE ${tableName} ADD COLUMN ${column.name} ${column.type} DEFAULT ${defaultValue}`;
                        await connection.execute(addColumnSQL);
                        console.log(`✅ Added column '${column.name}' to '${tableName}'`);
                    }
                }
            }

            // Handle removed columns
            for (const existingColumn of existingColumnNames) {
                if (!migrationColumnNames.includes(existingColumn)) {
                    const { confirmRemove } = await inquirer.createPromptModule()([
                        {
                            type: "confirm",
                            name: "confirmRemove",
                            message: `Column '${existingColumn}' exists in '${tableName}' but is NOT in the migration file. Do you want to remove it?`,
                            default: false,
                        },
                    ]);

                    if (confirmRemove) {
                        // Ask if they want to move data before dropping
                        const { moveData } = await inquirer.createPromptModule()([
                            {
                                type: "confirm",
                                name: "moveData",
                                message: `Do you want to move data from '${existingColumn}' to another column before deleting?`,
                                default: true,
                            },
                        ]);

                        if (moveData) {
                            const { newColumn } = await inquirer.createPromptModule()([
                                {
                                    type: "input",
                                    name: "newColumn",
                                    message: `Enter the name of the column to move data into:`,
                                },
                            ]);

                            // Move data
                            const moveDataSQL = `UPDATE ${tableName} SET ${newColumn} = ${existingColumn} WHERE ${newColumn} IS NULL`;
                            await connection.execute(moveDataSQL);
                            console.log(`🔄 Moved data from '${existingColumn}' to '${newColumn}'`);
                        }

                        // Drop column
                        const dropColumnSQL = `ALTER TABLE ${tableName} DROP COLUMN ${existingColumn}`;
                        await connection.execute(dropColumnSQL);
                        console.log(`🗑️ Dropped column '${existingColumn}'`);
                    }
                }
            }
        }
    }

    console.log("🚀 Database migration complete!");
    await connection.end();
}

// Run the migration script
runMigrations().catch(console.error);
