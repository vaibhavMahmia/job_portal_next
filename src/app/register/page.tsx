import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";
import React from "react";

const RegisterPage: React.FC = async () => {
    const user = await getCurrentUser();

    if (user) {
        if (user.role === "applicant") return redirect("/dashboard/applicant");
        if (user.role === "employer") return redirect("/dashboard/employer");
    }

    return <RegisterForm />
};

export default RegisterPage;