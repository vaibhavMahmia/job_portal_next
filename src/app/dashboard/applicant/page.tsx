import { ApplicantProfileStatus } from '@/features/applicants/components/ApplicantProfileStatus';
import { ApplicantStats } from '@/features/applicants/components/ApplicantStats';
import { RecentApplications } from '@/features/applicants/components/RecentApplications';
import { getCurrentUser } from '@/features/auth/server/auth.queries';
import { redirect } from 'next/navigation';

const ApplicantDashboard = async () => {
    const user = await getCurrentUser();
    if (!user) return redirect('/login');

    return (
        <div className="space-y-8 p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight text-gray-700">
                    Hello, <span className="capitalize">{user.name}</span>
                </h1>
                <p className="text-gray-500">
                    Here is your daily activities and job alerts
                </p>
            </div>
            <ApplicantStats />
            <ApplicantProfileStatus />
            <RecentApplications />
        </div>
    );
};
export default ApplicantDashboard;
