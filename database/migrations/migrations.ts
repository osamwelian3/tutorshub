export default [
    {
        tableName: "users",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "first_name", type: "VARCHAR(100) NOT NULL" },
            { name: "middle_name", type: "VARCHAR(100) NULL", defaultValue: null },
            { name: "last_name", type: "VARCHAR(100) NOT NULL" },
            { name: "email", type: "VARCHAR(100) UNIQUE NOT NULL" },
            { name: "home_address", type: "VARCHAR(100) NOT NULL" },
            { name: "phone_number", type: "VARCHAR(20) UNIQUE NOT NULL" },
            { name: "dob", type: "DATE NOT NULL" },
            { name: "avator", type: "VARCHAR(100) NULL", defaultValue: null },
            { name: "password", type: "VARCHAR(255) NOT NULL"}
        ],
    },
    {
        tableName: "sessions",
        columns: [
            {name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT"},
            { name: "user_id", type: "INT NOT NULL" },  // Link session to user
            {name: "session_key", type: "VARCHAR(255) NOT NULL"},
            {name: "created_at", type: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP"},
            {name: "updated_at", type: "DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP"}
        ]
    },
    {
        tableName: "tutors",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "name", type: "VARCHAR(100) NOT NULL" },
            { name: "subject", type: "VARCHAR(255) NOT NULL" },
        ],
    },
];
