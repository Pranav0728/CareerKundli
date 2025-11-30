import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CareerKundli - AI Resume Analysis",
  description:
    "Get personalized career insights with AI-powered resume analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap theme provider here to sync server + client */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="top-center" />
          {/* Floating Feedback Button */}
          <Link
            href="/feedback"
            aria-label="Write feedback"
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl flex items-center justify-center hover:opacity-90 transition-all">
              <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
            </div>

            {/* Feedback Label */}
            <span className="absolute right-20 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg shadow-lg">
              Feedback
            </span>
          </Link>
        </ThemeProvider>
      </body>
    </html>
  );
}
