import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log In or Sign Up — bogie",
  description: "Log in or create a bogie account to book cabs, trucks, and ambulances.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 pt-32 pb-20 sm:pt-40">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
