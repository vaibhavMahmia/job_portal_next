'use server';

import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { JobFormData, jobSchema } from "../../jobs/jobs.schema";
import { db } from "@/config/db";
import { jobs } from "@/drizzle/schema";
import { Job } from "../../jobs/types/job.types";
import { and, eq } from "drizzle-orm";

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

export const getEmployerJobsAction = async (): Promise<{
    status: 'success' | 'error';
    data?: Array<Job>;
    message?: string;
}> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer') return { status: 'error', data: [] };

        const result = await db.select().from(jobs).where(eq(jobs.employerId, currentUser.id)).orderBy(jobs.createdAt);
        return { status: 'success', data: result as Array<Job> };
    } catch (error) {
        return { status: 'error', message: 'Something went wrong, Please try again later.' };
    }
}

export const deleteJobAction = async (jobId: number): Promise<{ status: 'success' | 'error'; message: string; }> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer') return { status: 'error', message: 'Unauthorized.' };

        await db.delete(jobs).where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)));
        return { status: 'success', message: 'Job deleted successfully.' };
    } catch (error) {
        return { status: 'error', message: 'Something went wrong, Please try again later.' };
    }
}