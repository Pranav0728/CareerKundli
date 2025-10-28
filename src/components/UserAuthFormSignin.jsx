"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function UserAuthFormSignin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [gLoading, setGloading] = useState(false);
  const [ghLoading, setGhloading] = useState(false);
  const [error, setError] = useState("");

  // Handle custom email/password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res.error) {
        setError(res.error);
      } else {
        window.location.href = "/"; // redirect after login
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogle = async () => {
    setGloading(true);
    try {
      await signIn("google");
      
    } catch (err) {
      console.log(err);
    } finally {
      setGloading(false);
    }
  };

  // Github login
  const handleGithub = async () => {
    setGhloading(true);
    try {
      await signIn("github");
    } catch (err) {
      console.log(err);
    } finally {
      setGhloading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#f9f9f9",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Sign In</h2>

      <form onSubmit={handleEmailLogin} style={{ marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
          required
        />

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>

      <hr style={{ marginBottom: "15px" }} />

      <button
        onClick={handleGoogle}
        disabled={gLoading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#DB4437",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        {gLoading ? "Connecting..." : "Sign in with Google"}
      </button>

      <button
        onClick={handleGithub}
        disabled={ghLoading}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {ghLoading ? "Connecting..." : "Sign in with GitHub"}
      </button>
    </div>
  );
}
