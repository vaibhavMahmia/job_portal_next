import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { EmployerSidebar } from "@/features/employers/components/EmployerSidebar";
import { redirect } from "next/navigation";

const EmployerDashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const user = await getCurrentUser();
    if (!user) return redirect('/login');
    if (user.role !== 'employer') return redirect('/dashboard/applicant');
    return <div className="flex min-h-screen bg-background">
        <EmployerSidebar/>
        <main className="container mx-auto mt-5 ml-70 mr-5">{children}</main>
    </div>;
}

export default EmployerDashboardLayout;