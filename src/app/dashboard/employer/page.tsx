import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { EmployerProfileStatus } from "@/features/employers/components/EmployerProfileStatus";
import { EmployerStats } from "@/features/employers/components/EmployerStats";
import { redirect } from "next/navigation";
import React from "react";

const EmployerDashboard: React.FC = async () => {
    const user = await getCurrentUser();
    if (!user) return redirect('/login')
    return <div className="space-y-6">
        {/* Header */}
        <div>
            <h1 className="text-2xl font-semibold text-foreground">
                Hello, <span className="capitalize">{user?.name.toLowerCase()}</span>
            </h1>
            <p className="text-muted-foreground">
                Here is your daily activities and appLications
            </p>
        </div>

        {/* Stats Cards */}
        <EmployerStats/>

        <EmployerProfileStatus/>
    </div>
}

export default EmployerDashboard;