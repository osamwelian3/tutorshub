import pool from "@/lib/mysql";
import { hashPassword } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request:  NextRequest,
    { params }: any // { params: { slug: string } }
) {
    const slug = params.slug // user id
    
    try {
        const db = await pool.getConnection()        
        
        const query = 'select * from users where id = ?'
        const [rows] = await db.execute(query,[slug])
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(
    request:  NextRequest,
    { params }: any // { params: { slug: string } }
) {
    const slug = params.slug // user id
    const data = await request.json()
    let fields = ''

    if (data.first_name) {
        fields += `first_name='${data.first_name}', `
    }
    if (data.middle_name) {
        fields += `middle_name='${data.middle_name}', `
    }
    if (data.last_name) {
        fields += `last_name='${data.last_name}', `
    }
    if (data.email) {
        fields += `email='${data.email}', `
    }
    if (data.home_address) {
        fields += `home_address='${data.home_address}', `
    }
    if (data.phone_number) {
        fields += `phone_number='${data.phone_number}', `
    }
    if (data.avator) {
        fields += `avator='${data.avator}', `
    }
    if (data.password) {
        fields += `password='${await hashPassword(data.password)}', `
    }
    
    try {
        const db = await pool.getConnection()        
        
        const query = `update users set ${fields.replace(/,([^,]*)$/, '$1')} where id = ?`
        const [rows] = await db.execute(query,[slug])
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
