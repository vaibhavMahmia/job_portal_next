import { EmployerJobForm } from '@/features/employers/components/EmployerJobForm';
import React from 'react';

const JobsPage: React.FC = () => <>
    <h1 className='mb-5 text-2xl font-bold'> Post a New Job </h1>
    <EmployerJobForm />
</>;

export default JobsPage;