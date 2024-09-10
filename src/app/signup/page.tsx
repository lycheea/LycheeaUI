"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (password !== confirmation) {
      setError("Confirmation password does not match.");
      return;
    }

    // TODO: Add validation logic here

    try {
      await createUserWithEmailAndPassword(getAuth(app), email, password);
    } catch (error) {
      setError(error.message);
      return;
    }

    router.push("/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-base-200">
      <div className="w-full bg-base-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-base-content md:text-2xl">Sign up</h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
			<div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-base-content">
                Username
              </label>
              <input type="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} id="name" className="bg-base-200 border border-base-300 text-base-content sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="qhhoj" required />
            </div>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-base-content">
                Full name
              </label>
              <input type="fullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} id="name" className="bg-base-200 border border-base-300 text-base-content sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="QHHOJ - Mission Impossible" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-base-content">
                Email address
              </label>
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-base-200 border border-base-300 text-base-content sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="qhhoj@qhhoj.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-base-content">
                Password
              </label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-base-200 border border-base-300 text-base-content sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-base-content">
                Confirm password
              </label>
              <input type="password" name="confirm-password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} id="confirm-password" placeholder="••••••••" className="bg-base-200 border border-base-300 text-base-content sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
            </div>
            <button type="submit" className="w-full text-primary-content bg-primary transform hover:scale-105 transition duration-200 ease-in-out font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign up
            </button>
            {error && (
              <div className="text-red-700 relative text-sm font-bold" role="alert">
                <span className="block sm:inline">⚠ {error}</span>
              </div>
            )}
            <p className="text-sm font-light text-info-content">
              Already have an account?{" "}
              <Link href="/signin" className="font-medium text-base-content hover:underline">
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
