import { EmployerJobForm } from '@/features/employers/components/EmployerJobForm';
import { getJobByIdAction } from '@/features/employers/server/jobs/jobs.action';
import { redirect } from 'next/navigation';
import React from 'react';

interface EditJobProps {
    params: { jobId: string };
}

const EditJobPage: React.FC<EditJobProps> = async ({ params }) => {
    const { jobId } = await params;
    const job_id = Number(jobId);
    if (Number.isNaN(job_id)) redirect('/dashboard/employer/jobs');

    const { status, data: job } = await getJobByIdAction(job_id);
    if (status === 'error' || !job) redirect('/dashboard/employer/jobs');

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Edit Job: {job.title}</h1>
                <EmployerJobForm initialData={job} isEditMode={true} />
            </div>
        </div>
    );
};

export default EditJobPage;
