"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
// import { ModeToggle } from "./ui/ModeToggle";
const logout = async () => {
  await signOut({ callbackUrl: "/" });
};
const Navbar = () => {
  // ✅ Dynamic navbar links
  const navItems = [
    { name: "Analyze", link: "/analyze" },
    { name: "History", link: "/history" },
  ];

  // ✅ Dynamic dropdown links
  const dropdownItems = [
    { name: "Profile", link: "/profile" },
    { name: "History", link: "/history" },
    { name: "Pricing", link: "/pricing" },
  ];
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch {}
    })();
  }, []);

  const isPro =
    profile?.subscription?.isActive &&
    profile?.subscription?.renewDate &&
    new Date(profile.subscription.renewDate).getTime() > Date.now();
  const { data: session } = useSession();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <Link href="/analyze" className="flex items-center gap-2 cursor-pointer">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gradient-gold">
              Career Kundli
            </span>
          </Link>

          {/* ✅ Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* ✅ Theme Toggle and Profile Dropdown */}
          <div className="flex items-center gap-3">
            {/* <ModeToggle /> */}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none relative">
                  <Avatar className={`w-9 h-9 border ${isPro ? "ring-2 ring-offset-2 ring-yellow-400 ring-offset-background" : "border-border"} transition-all`}>
                    {console.log(session?.user?.image)}
                    {session?.user?.image ? (
                      <AvatarImage src={session.user.image } alt="User Avatar" />
                    ) : (
                      <AvatarFallback className="bg-primary text-primary-foreground">{session?.user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    )}
                  </Avatar>
                  {isPro && (
                    <span className="absolute -top-1 -right-1 text-[10px] px-2  rounded-full bg-yellow-400 text-black font-bold shadow">PRO</span>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44 mt-2">
                {dropdownItems.map((item, index) => (
                  <div key={index}>
                    {item.separator && <DropdownMenuSeparator />}
                    <DropdownMenuItem asChild>
                      <Link href={item.link}>{item.name}</Link>
                    </DropdownMenuItem>
                  </div>
                ))}
                {!isPro && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button
                    onClick={async () => {
                      setIsLoggingOut(true);
                      try {
                        await signOut({ callbackUrl: "/" });
                      } finally {
                        setIsLoggingOut(false);
                      }
                    }}
                    variant="destructive"
                    className="w-full"
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : "Logout"}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;