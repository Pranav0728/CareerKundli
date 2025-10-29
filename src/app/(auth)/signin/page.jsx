"use client";
// import React, { useState, useEffect } from "react";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function SignInForm() {
//   const { data: session, status } = useSession();
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     if (session) {
//       router.push("/");
//     }
//   }, [session, router]);

//   const handleEmailSignIn = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await signIn("email", { email, redirect: false });
//       setLoading(false);
//       if (res?.error) {
//         alert(res.error);
//         return;
//       }
//       alert("Check your email for the magic link!");
//       router.push("/");
//     } catch (err) {
//       setLoading(false);
//       alert("Something went wrong");
//     }
//   };
//     const handleGoogle = async () => {
//     await signIn("google", { callbackUrl: "/" });
//   };


//   const handleGithub = async () => {
//     await signIn("github", { callbackUrl: "/" });
//   };


//   if (status === "loading" || session) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
//       <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left: Branding / content */}
//         <section className="rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 text-white shadow p-8 flex flex-col text-center  justify-center">
//           <div>
//             <h2 className="text-3xl font-semibold">Sample Auth</h2>
//             <p className="text-white/90">
//               Sample auth page to test sign in with email, google, and github.
//             </p>
//           </div>
//         </section>


//         {/* Right: Sign-in form */}
//         <section className="rounded-2xl bg-white dark:bg-slate-800 shadow p-8">
//           <div className="mb-8">
//             <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Welcome back</h2>
//             <p className="text-slate-600 dark:text-slate-300">Sign in to continue</p>
//           </div>


//           <form onSubmit={handleEmailSignIn} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full px-4 py-2 rounded-md border bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-700 outline-none"
//                 required
//               />
//             </div>


//             {error && <p className="text-red-600 text-sm">{error}</p>}


//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-60 transition-colors"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </form>


//           <div className="my-6 flex items-center">
//             <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
//             <span className="mx-3 text-xs text-slate-500">or</span>
//             <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
//           </div>


//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <button
//               onClick={handleGoogle}
//               className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
//             >
//               Continue with Google
//             </button>
//             <button
//               onClick={handleGithub}
//               className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-md text-slate-900 dark:text-white"
//             >
//               Continue with GitHub
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      <Card className="w-full max-w-md glow-effect">
        <CardContent className="p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gradient-gold">Career Kundli</h1>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-center text-muted-foreground mb-8">
            Sign in to unlock your career destiny
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com"
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••"
                className="bg-background/50"
              />
            </div>

            <Button variant="hero" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary font-medium hover:underline">
                Sign Up
              </button>
            </p>
          </div>

          <button 
            onClick={() => router.push('/')}
            className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            ← Back to Home
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;

