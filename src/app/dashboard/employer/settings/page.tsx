import { EmployerSettingsForm } from '@/features/employers/components/EmployerSettingsForm';
import { EmployerProfileData } from '@/features/employers/employers.schema';
import { getCurrentEmployerDetails } from '@/features/employers/server/employers.queries';
import { redirect } from 'next/navigation';
import React from 'react';

const SettingsPage: React.FC = async () => {
    const employer = await getCurrentEmployerDetails();
    if (!employer) return redirect('/login');

    return (
        <EmployerSettingsForm
            initialData={
                {
                    name: employer.employerDetails.name,
                    description: employer.employerDetails.description,
                    organizationType: employer.employerDetails.organizationType,
                    teamSize: employer.employerDetails.teamSize,
                    location: employer.employerDetails.location,
                    websiteUrl: employer.employerDetails.websiteUrl,
                    yearOfEstablishment:
                        employer.employerDetails.yearOfEstablishment?.toString(),
                    avatarUrl: employer.avatarUrl,
                    bannerImageUrl: employer.employerDetails.bannerImageUrl,
                } as Partial<EmployerProfileData>
            }
        />
    );
};

export default SettingsPage;
