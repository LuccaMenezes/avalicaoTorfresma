import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { Role, Users } from "@prisma/client";

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'
const EXPIRA = process.env.EXPIRA || '3600'
export const generateToken = (user: Users & { role: Role | null }): string => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role?.name }, JWT_SECRET, { expiresIn: parseInt(EXPIRA) })
}