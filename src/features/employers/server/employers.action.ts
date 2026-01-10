'use server';
import { db } from "@/config/db";
import { employers, users } from "@/drizzle/schema";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { eq } from "drizzle-orm";
import { EmployerProfileData } from "../employers.schema";

export const updateEmployerProfileAction = async (data: EmployerProfileData) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer') return { status: 'error', message: 'unauthorized' };

        const {
            name,
            description,
            yearOfEstablishment,
            location,
            websiteUrl,
            organizationType,
            teamSize,
            avatarUrl,
            bannerImageUrl,
        } = data;

        const updatedEmployer = await db.update(employers).set({
            name,
            description,
            yearOfEstablishment: yearOfEstablishment ? parseInt(yearOfEstablishment) : null,
            location,
            websiteUrl,
            organizationType,
            teamSize,
            bannerImageUrl
        }).where(eq(employers.id, currentUser.id));

        await db
            .update(users)
            .set({
                avatarUrl,
            })
            .where(eq(users.id, currentUser.id));

        return { status: 'success', message: 'Profile updated successfully' };
    } catch (error) {
        return { status: 'error', message: 'Something went wrong, please try again' };
    }
}