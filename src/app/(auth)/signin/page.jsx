"use client";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("email", { email, redirect: false });
      setLoading(false);
      if (res?.error) {
        alert(res.error);
        return;
      }
      alert("Check your email for the magic link!");
      router.push("/");
    } catch (err) {
      setLoading(false);
      alert("Something went wrong");
    }
  };
    const handleGoogle = async () => {
    await signIn("google", { callbackUrl: "/" });
  };


  const handleGithub = async () => {
    await signIn("github", { callbackUrl: "/" });
  };


  if (status === "loading" || session) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Branding / content */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow p-8 flex flex-col text-center  justify-center">
          <div>
            <h2 className="text-3xl font-semibold">Sample Auth</h2>
            <p className="text-white/90">
              Sample auth page to test sign in with email, google, and github.
            </p>
          </div>
        </section>


        {/* Right: Sign-in form */}
        <section className="rounded-2xl bg-white dark:bg-slate-800 shadow p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome back</h2>
            <p className="text-slate-600 dark:text-slate-300">Sign in to continue</p>
          </div>


          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-md border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-700 outline-none"
                required
              />
            </div>


            {error && <p className="text-red-600 text-sm">{error}</p>}


            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-60 transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>


          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="mx-3 text-xs text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleGoogle}
              className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            >
              Continue with Google
            </button>
            <button
              onClick={handleGithub}
              className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
            >
              Continue with GitHub
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
