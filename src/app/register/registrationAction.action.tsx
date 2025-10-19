'use server';

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { hash } from "argon2";

export const registrationAction = async (data: {
    name: string;
    userName: string;
    email: string;
    password: string;
    role: "applicant" | "employer";
}) => {
    try {
        const { name, userName, email, password, role } = data;
        const hashPassword = await hash(password);
        await db.insert(users).values({ name, userName, email, password: hashPassword, role });
        return {
            status: 'success',
            message: 'Registration Completed Successfully!'
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'Unknown Error Occured! Please Try Again Later.'
        }
    }
}