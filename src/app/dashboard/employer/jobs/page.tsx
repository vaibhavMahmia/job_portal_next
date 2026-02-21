import { EmployerJobList } from '@/features/employers/components/EmployerJobList';
import React from 'react';

const JobListPage: React.FC = () => (
    <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">My Job Posts</h1>
        <EmployerJobList />
    </div>
);

export default JobListPage;
