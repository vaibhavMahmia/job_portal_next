import { redirect } from 'next/navigation';
import React from 'react';

interface EditJobProps { params: { jobId: string; } }

const EditJobPage: React.FC<EditJobProps> = async ({ params }) => {
    const { jobId } = await params;
    const jId = Number(jobId);
    if (Number.isNaN(jId)) redirect('/dashboard/employer/jobs');

    return <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Edit Job</h1>
        <p>Editing job with ID: {jId}</p>
    </div>;
}

export default EditJobPage;