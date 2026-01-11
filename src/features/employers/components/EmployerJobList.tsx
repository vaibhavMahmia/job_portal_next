'use client';

import React, { useEffect, useState } from 'react'
import { Job } from '../jobs/types/job.types';
import { getEmployerJobsAction } from '../server/jobs/jobs.action';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { EmployerJobCard } from './EmployerJobCard';

export const EmployerJobList: React.FC = () => {
    const [jobs, setJobs] = useState<Array<Job>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
               const res = await getEmployerJobsAction();
               if (res.status === 'success' && res.data) setJobs(res.data);
               else toast.error(res.message || 'Failed to load jobs.');
            } catch (error) {
                toast.error('Something went wrong.');
            } finally {
                setIsLoading(false);
            }
        }

        fetchJobs();
    }, []);
    
    if (isLoading) return <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className='w-8 h-8 animate-spin' />
    </div>;

    if (jobs.length === 0) return <div className="text-center py-12">
        <p className="text-muted-foreground">No jobs posted yet.</p>
    </div>;

    return <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {jobs.map((job) => <EmployerJobCard key={job.id} job={job} />)}
    </section>;
}
