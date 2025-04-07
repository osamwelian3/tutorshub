export interface User {
    id?: number
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    home_address: string
    phone_number: string
    dob: Date
    avator?: string
    password: string
}