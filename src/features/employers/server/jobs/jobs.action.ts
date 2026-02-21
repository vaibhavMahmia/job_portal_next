'use server';

import { getCurrentUser } from '@/features/auth/server/auth.queries';
import { JobFormData, jobSchema } from '../../jobs/jobs.schema';
import { db } from '@/config/db';
import { jobs } from '@/drizzle/schema';
import { Job } from '../../jobs/types/job.types';
import { and, eq } from 'drizzle-orm';

export const createJobAction = async (
    data: JobFormData
): Promise<{ status: 'success' | 'error'; message: string }> => {
    try {
        const { success, data: result, error } = jobSchema.safeParse(data);
        if (!success)
            return { status: 'error', message: error.issues[0].message };

        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer')
            return { status: 'error', message: 'Unauthorized' };

        await db.insert(jobs).values({ ...result, employerId: currentUser.id });
        return { status: 'success', message: 'Job posted successfully' };
    } catch (error) {
        return {
            status: 'error',
            message: 'Something went wrong, Please try again later.',
        };
    }
};

export const getEmployerJobsAction = async (): Promise<{
    status: 'success' | 'error';
    data?: Array<Job>;
    message?: string;
}> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer')
            return { status: 'error', data: [] };

        const result = await db
            .select()
            .from(jobs)
            .where(eq(jobs.employerId, currentUser.id))
            .orderBy(jobs.createdAt);
        return { status: 'success', data: result as Array<Job> };
    } catch (error) {
        return {
            status: 'error',
            message: 'Something went wrong, Please try again later.',
        };
    }
};

export const deleteJobAction = async (
    jobId: number
): Promise<{ status: 'success' | 'error'; message: string }> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer')
            return { status: 'error', message: 'Unauthorized.' };

        await db
            .delete(jobs)
            .where(
                and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id))
            );
        return { status: 'success', message: 'Job deleted successfully.' };
    } catch (error) {
        return {
            status: 'error',
            message: 'Something went wrong, Please try again later.',
        };
    }
};

export const getJobByIdAction = async (
    jobId: number
): Promise<{ status: 'success' | 'error'; message?: string; data?: any }> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) return { status: 'error', message: 'Unauthorized.' };

        const [job] = await db
            .select()
            .from(jobs)
            .where(and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id)))
            .limit(1);
        if (!job) return { status: 'error', message: 'job not found.' };
        return { status: 'success', data: job };
    } catch (error) {
        return { status: 'error', message: 'Failed to fetch job details.' };
    }
};

export const updateJobAction = async (
    jobId: number,
    values: any
): Promise<{ status: 'success' | 'error'; message: string }> => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.role !== 'employer')
            return { status: 'error', message: 'Unauthorized.' };

        await db
            .update(jobs)
            .set({ ...values, updatedAt: new Date() })
            .where(
                and(eq(jobs.id, jobId), eq(jobs.employerId, currentUser.id))
            );
        return { status: 'success', message: 'Job updated successfully' };
    } catch (error) {
        return { status: 'error', message: 'Failed to update job.' };
    }
};
