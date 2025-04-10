import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  console.log(hash)
  return hash;
}

export async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
