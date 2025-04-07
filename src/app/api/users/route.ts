import pool from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { hashPassword } from "@/lib/utils";

const UPLOAD_DIR = path.resolve(__dirname, "../../../../../logs").replace("[project]/", "");

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from users'
        const [rows] = await db.execute(query)
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR);
        }
        
        fs.writeFileSync(
            path.resolve(UPLOAD_DIR, 'error.log'),
            error as string
        );
        return NextResponse.json({
            error: 'Something went wrong'
        }, { status: 500 })
    }
}

type Data = {
    first_name: string,
    middle_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    home_address: string,
    dob: string,
    password: string,
    confirm_password: string
  }

export async function POST(req: NextRequest) {
    try {
        const data: Data = await req.json()
        console.log(data)
        const db = await pool.getConnection()
        const query = `INSERT INTO users (email, first_name, middle_name, last_name, home_address, phone_number, dob, avator, password) VALUES ('${data.email}', '${data.first_name}', '${data.middle_name}', '${data.last_name}', '${data.home_address}', '${data.phone_number}', '${new Date(data.dob).toISOString().slice(0,19).replace("T", " ").replace(/'/g, "''")}', NULL, '${await hashPassword(data.password)}')`
        const queryUser = `SELECT id, email, first_name, middle_name, last_name, home_address, phone_number, dob, avator FROM users WHERE email = '${data.email}' LIMIT 1`
        const [rows] = await db.execute(query);
        const [rows2] = await db.execute(queryUser);
        db.release()
        
        return NextResponse.json({
            success: true,
            user: (rows2 as Array<any>)[0]
        })
    } catch (error) {
        if (error instanceof Error) {
            if (!fs.existsSync(UPLOAD_DIR)) {
                fs.mkdirSync(UPLOAD_DIR);
            }
            
            fs.writeFileSync(
                path.resolve(UPLOAD_DIR, 'error.log'),
                error.toString(),
            );
            let message = '';
            if (error.message.includes('users.phone_number')) {
                message = 'That phone number is already taken.'
            } else if (error.message.includes('users.email')) {
                message = 'A user with that email already exists. Do you want to login instead.'
            } else {
                message = error.message
            }
            return NextResponse.json({
                error: message
            }, { status: 500 })
        } else {
            return NextResponse.json({
                error: error
            }, { status: 500 })
        }
    }
}
