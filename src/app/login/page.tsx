import { LoginForm } from '@/features/auth/components/LoginForm';
import { getCurrentUser } from '@/features/auth/server/auth.queries';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage: React.FC = async () => {
    const user = await getCurrentUser();

    if (user) {
        if (user.role === 'applicant') return redirect('/dashboard/applicant');
        if (user.role === 'employer') return redirect('/dashboard/employer');
    }

    return <LoginForm />;
};

export default LoginPage;
