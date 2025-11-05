import { logoutUserAction } from "@/features/auth/server/auth.actions";

const EmployerDashboard = () => <>
    <h1>Welcome Employer</h1>
    <button onClick={logoutUserAction}>Logout</button>
</>;
export default EmployerDashboard;