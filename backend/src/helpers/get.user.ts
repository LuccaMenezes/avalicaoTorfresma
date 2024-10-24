import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'
const EXPIRA = process.env.EXPIRA || '3600'
export const getUserByToken = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded;
}