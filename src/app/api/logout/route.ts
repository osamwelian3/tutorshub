import pool from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";
import { env } from "node:process";

export async function GET(req: NextRequest) {
    const session_key = req.cookies.get('session_key')?.value
    if (session_key) {
        try {
            const db = await pool.getConnection()
            const query = 'DELETE FROM sessions WHERE session_key = ?'
            await db.execute(query, [session_key])

            let res = NextResponse.json({
                success: true
            })
            res.headers.set("Set-Cookie", `session_key=${null}; Path=/; HttpOnly; ${env.NODE_ENV === 'production' ? 'Secure;' : ''} SameSite=Strict; Max-Age=1`)
            return res
        } catch (error) {
            return NextResponse.json({
                error: 'An error occured trying to log you out'
            })
        }
    } else {
        return NextResponse.json({
            error: 'No session found'
        })
    }
}