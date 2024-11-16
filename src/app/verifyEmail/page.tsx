"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verfiyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verfiyUserEmail();
    }
  }, [token]);
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <>
      <h1>Verify Email</h1>
      <h2>{token ? `${token}` : "no token"}</h2>
      {verified && (
        <div>
          <h2>User Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>error</h2>
        </div>
      )}
    </>
  );
}
