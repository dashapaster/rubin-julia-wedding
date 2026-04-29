import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-lake-mist px-4 py-10">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
