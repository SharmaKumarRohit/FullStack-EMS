import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  AttendancePage,
  Dashboard,
  Employees,
  Layout,
  Leave,
  LoginLanding,
  Payslips,
  PrintPayslip,
  Settings,
} from "./pages";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginLanding />} />
      <Route
        path="/login/admin"
        element={
          <LoginForm
            role="admin"
            title="Admin Portal"
            subTitle="Sign in to manage the organization"
          />
        }
      />
      <Route
        path="/login/employee"
        element={
          <LoginForm
            role="employee"
            title="Employee Portal"
            subTitle="Sign in to access your account"
          />
        }
      />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/payslips" element={<Payslips />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/print/payslips/:id" element={<PrintPayslip />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
