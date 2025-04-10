import { v4 as uuidv4 } from "uuid";
import pool from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";
import { env } from "node:process";
import { comparePassword } from "@/lib/utils";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        console.log(data)
        const db = await pool.getConnection()
        const queryUser = `SELECT id, email, first_name, middle_name, last_name, home_address, phone_number, dob, role, avator, password FROM users WHERE email = '${data.email}' LIMIT 1`
        const [rows2] = await db.execute(queryUser);
        db.release()

        const user = (rows2 as Array<any>)[0]

        if (await comparePassword(data.password, user.password)) {
            const session_key = await generateSession(user.id)
            let res = NextResponse.json({
                success: true,
                user: {...user, password: undefined},
                session_key: session_key
            })
            res.headers.set("Set-Cookie", `session_key=${session_key}; Path=/; HttpOnly; ${env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Strict; Max-Age=86400`)
            return res
        } else {
            return NextResponse.json({
                error: "Credentials do not match",
            })
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({
                error: "Problem occured trying to log you in."
            }, { status: 500 })
        } else {
            return NextResponse.json({
                error: error
            }, { status: 500 })
        }
    }
}

// Generate a new session token
async function generateSession(userId: number) {
    const sessionKey = uuidv4(); // Unique session token
    const connection = await pool.getConnection()

    // Save session in DB
    await connection.execute(
        "INSERT INTO sessions (user_id, session_key) VALUES (?, ?)",
        [userId, sessionKey]
    );

    await connection.release();

    return sessionKey;
}

export async function GET(req: NextRequest) {
    const session_key = req.cookies.get('session_key')?.value
    console.log('Session key: ', session_key)
    if (session_key) {
        try {
            const db = await pool.getConnection()
            const deleteQuery = 'DELETE FROM sessions WHERE sessions.updated_at < DATE_SUB(NOW(), INTERVAL 1 DAY)'
            await db.execute(deleteQuery);
            const userQuery = `SELECT users.id, users.first_name, users.middle_name, users.last_name, users.email, users.home_address, users.phone_number, users.dob, users.avator, users.role FROM sessions JOIN users ON sessions.user_id = users.id WHERE sessions.session_key = ?`
            const [rows] = await db.execute(userQuery, [session_key])
            db.release()
            
            const user = (rows as Array<any>)
    
            if (user.length > 0) {
                return NextResponse.json({
                    success: true,
                    user: (rows as Array<any>)[0]
                })
            } else {
                return NextResponse.json({
                    error: "No valid session, Please login"
                })
            }
        } catch (error) {
            return NextResponse.json({
                error: 'Something went wrong'
            }, { status: 500 })
        }
    } else {
        return NextResponse.json({
            error: "No valid session, Please login"
        })
    }
}