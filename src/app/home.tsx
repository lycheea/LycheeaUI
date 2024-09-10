"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

interface HomePageProps {
  email?: string;
}

export default function HomePage({ email }: HomePageProps) {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getAuth(app));
    await fetch("/api/signout");

    router.push("/signin");
  }

  return (
    <main className="flex bg-base-100 min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-base-content text-xl mb-4">Lycheea - Trái vải thơm ngon</h1>
      <p className="text-base-content mb-8">
        Currently logged in as <strong>{email}</strong>.
      </p>
      <button
        onClick={handleLogout}
        className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800"
      >
        Sign out
      </button>
    </main>
  );
}
