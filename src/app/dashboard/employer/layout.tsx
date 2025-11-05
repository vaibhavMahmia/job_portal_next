import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

const EmployerDashboardLayout = async ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    const user = await getCurrentUser();
    if (!user) return redirect('/login');
    if (user.role !== 'employer') return redirect('/dashboard/applicant');
    return <>
        {children}
    </>;
}

export default EmployerDashboardLayout;