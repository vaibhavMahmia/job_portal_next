'use server';

import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { JobFormData, jobSchema } from "../../jobs/jobs.schema";
import { db } from "@/config/db";
import { jobs } from "@/drizzle/schema";

export const createJobAction = async (data: JobFormData) => {
    try {
        const { success, data: result, error } = jobSchema.safeParse(data);
        if (!success) return { status: 'error', message: error.issues[0].message };

        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer') return { status: 'error', message: 'Unauthorized' };

        await db.insert(jobs).values({ ...result, employerId: currentUser.id });
        return { status: 'success', message: 'Job posted successfully'};
    } catch (error) {
        return { status: 'error', message: 'Something went wrong, Please try again later.' };
    }
}