"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
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
    { name: "Settings", link: "/settings" },
    { name: "Pricing", link: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
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
                <button className="focus:outline-none">
                  <Avatar className="w-9 h-9 border border-border hover:ring-2 hover:ring-primary transition-all">
                    <AvatarImage src="/avatar.png" alt="User Avatar" />
                    <AvatarFallback>
                      <User className="w-4 h-4 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
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
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Button onClick={logout} variant="destructive" className="w-full">
                    Logout
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
