"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { signOut } from "next-auth/react";
export default function DashboardPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload your resume first!");

    try {
      setLoading(true);
      setResult(null);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to analyze");

      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while analyzing. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <Navbar/>
        <button onClick={() =>signOut()} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">
          Sign Out
        </button>
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">
        Career Kundali 🔮
      </h1>

      <form
        onSubmit={handleAnalyze}
        className="bg-white p-6 shadow-lg rounded-xl w-full max-w-md mb-8"
      >
        <label className="block mb-2 text-gray-700 font-medium">
          Upload Resume (PDF)
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Analyzing..." : "Generate Career Kundali"}
        </button>
      </form>

      {result && (
  <div className="bg-white p-6 shadow-md rounded-xl w-full max-w-2xl">
    <h2 className="text-xl font-semibold mb-3">Your Career Kundali</h2>

    {/* 🔹 Horoscope (text from narrator) */}
    {result.horoscope && (
      <div className="mb-4">
        <h3 className="font-semibold text-indigo-600">Career Horoscope</h3>
        <p className="text-gray-700">{result.horoscope}</p>
      </div>
    )}

    {/* 🔹 Prediction (object with keys) */}
    {result.prediction && (
      <div className="mb-4">
        <h3 className="font-semibold text-indigo-600">Career Prediction</h3>
        <p><strong>Next Roles:</strong> {result.prediction.next_roles?.join(", ")}</p>
        <p><strong>Growth Score:</strong> {result.prediction.growth_score}</p>
        <p><strong>Skill Gaps:</strong> {result.prediction.skill_gaps?.join(", ")}</p>
      </div>
    )}

    {/* 🔹 Analysis (skills, roles, etc.) */}
    {result.analysis && (
      <div className="mb-4">
        <h3 className="font-semibold text-indigo-600">Resume Analysis</h3>
        <p><strong>Skills:</strong> {result.analysis.skills?.join(", ")}</p>
        <p><strong>Roles:</strong> {result.analysis.roles?.join(", ")}</p>
        <p><strong>Education:</strong> {result.analysis.education?.join(", ")}</p>
        <p><strong>Achievements:</strong> {result.analysis.achievements?.join(", ")}</p>
      </div>
    )}
  </div>
)}

    </div>
  );
}
