"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadResume() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!file) {
      setError("Please select a PDF resume.");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }
      router.push(`/result/${data.id}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-600/10 via-indigo-600/10 to-blue-600/10 border border-white/10 backdrop-blur">
        <h2 className="text-2xl font-semibold mb-3">
          Upload your Resume to Reveal Your Career Horoscope 🌟
        </h2>
        <p className="text-sm text-white/70 mb-4">
          PDF only. We’ll analyze it and craft your CareerKundli.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
          />
          {error && (
            <div className="text-red-400 text-sm">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading && (
              <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>
      </div>
    </div>
  );
}