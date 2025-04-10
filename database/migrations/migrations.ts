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
            { name: "role", type: "ENUM('student', 'tutor', 'parent', 'admin', 'guest') NULL" },
            { name: "dob", type: "DATE NOT NULL" },
            { name: "avator", type: "VARCHAR(100) NULL", defaultValue: null },
            { name: "password", type: "VARCHAR(255) NOT NULL" },
            { name: "last_login", type: "DATETIME on update CURRENT_TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP" },
            { name: "created_at", type: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP" },
            { name: "updated_at", type: "DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP" }
        ],
    },
    {
        tableName: "sessions",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "user_id", type: "INT NOT NULL" },  // Link session to user
            { name: "session_key", type: "VARCHAR(255) NOT NULL" },
            { name: "created_at", type: "DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP" },
            { name: "updated_at", type: "DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP" }
        ]
    },
    {
        tableName: "students",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "user_id", type: "INT NOT NULL" },
            { name: "grade_level", type: "VARCHAR(50) NULL" }
        ]
    },
    {
        tableName: "parents",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "user_id", type: "INT NOT NULL" } // Linked to users table
        ]
    },
    {
        tableName: "student_parents",
        columns: [
            { name: "student_id", type: "INT NOT NULL" },
            { name: "parent_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "tutors",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "user_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "subjects",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "name", type: "VARCHAR(100) NOT NULL UNIQUE" },
            { name: "poster_image", type: "VARCHAR(255) NULL" }
        ]
    },
    {
        tableName: "classes",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "name", type: "VARCHAR(100) NOT NULL UNIQUE" },
            { name: "poster_image", type: "VARCHAR(255) NULL" }
        ]
    },
    {
        tableName: "tutor_subjects",
        columns: [
            { name: "tutor_id", type: "INT NOT NULL" },
            { name: "subject_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "tutor_classes",
        columns: [
            { name: "tutor_id", type: "INT NOT NULL" },
            { name: "class_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "student_subjects",
        columns: [
            { name: "student_id", type: "INT NOT NULL" },
            { name: "subject_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "student_classes",
        columns: [
            { name: "student_id", type: "INT NOT NULL" },
            { name: "class_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "tutor_student",
        columns: [
            { name: "tutor_id", type: "INT NOT NULL" },
            { name: "student_id", type: "INT NOT NULL" }
        ]
    },
    {
        tableName: "availability",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "tutor_id", type: "INT NOT NULL" },
            { name: "day_of_week", type: "ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL" },
            { name: "start_time", type: "TIME NOT NULL" },
            { name: "end_time", type: "TIME NOT NULL" }
        ]
    },
    {
        tableName: "schedules",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "student_id", type: "INT NOT NULL" },
            { name: "tutor_id", type: "INT NOT NULL" },
            { name: "subject_id", type: "INT NOT NULL" },
            { name: "class_id", type: "INT NOT NULL" },
            { name: "start_time", type: "DATETIME NOT NULL" },
            { name: "end_time", type: "DATETIME NOT NULL" },
            { name: "location", type: "VARCHAR(255) NULL" },
            { name: "notes", type: "TEXT NULL" },
            { name: "status", type: "ENUM('scheduled', 'cancelled', 'completed') NOT NULL DEFAULT 'scheduled'" },
            { name: "is_recurring", type: "BOOLEAN DEFAULT FALSE" },
            { name: "recurrence_type", type: "ENUM('daily', 'weekly', 'biweekly') NULL" },
            { name: "recurrence_day", type: "ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NULL" },
            { name: "recurrence_end_date", type: "DATE NULL" }
        ]
    },
    {
        tableName: "grades",
        columns: [
            { name: "id", type: "INT PRIMARY KEY AUTO_INCREMENT" },
            { name: "student_id", type: "INT NOT NULL" },
            { name: "subject_id", type: "INT NOT NULL" },
            { name: "class_id", type: "INT NOT NULL" },
            { name: "tutor_id", type: "INT NOT NULL" },
            { name: "term", type: "VARCHAR(50) NULL" }, // e.g. Term 1, Semester 2
            { name: "score", type: "DECIMAL(5,2) NOT NULL" }, // e.g. 88.50
            { name: "grade", type: "VARCHAR(5) NULL" },      // Optional e.g. A, B+
            { name: "remarks", type: "TEXT NULL" },
            { name: "recorded_at", type: "DATETIME DEFAULT CURRENT_TIMESTAMP" },
            { name: "updated_at", type: "DATETIME on update CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP" }
        ]
    }
];
