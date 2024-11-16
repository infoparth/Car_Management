"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import backgroundImg from "@/assets/ford4.png"; // Import your background image

export default function ForgotPasswordPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const { toast } = useToast();

  const changePassword = async () => {
    try {
      if (newpassword === checkPassword) {
        const res = await axios.post("/api/users/changePassword", {
          token,
          newpassword,
        });
        setVerified(true);
        toast({
          title: "Password changed",
        });
      } else {
        setNewPassword("");
        setCheckPassword("");
        toast({
          title: "Passwords don't match",
          description: "Re-enter your password",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
      if (error.response.data.error === "Invalid token")
        toast({
          title: "Try getting a new token",
          description: "Invalid Token",
          variant: "destructive",
        });
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-start justify-start p-8"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm">
        {!verified ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="password">Enter your new password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      value={newpassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm New Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*********"
                      value={checkPassword}
                      onChange={(e) => setCheckPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    onClick={changePassword}
                  >
                    Set New Password
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Go back to login page{" "}
                  <Link href="/login" className="underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Password Changed!!</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Password Changed Successfully</Label>
                  </div>
                  <div className="grid gap-2"></div>
                  <Link href="/login" className="underline">
                    Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        <Toaster />
      </div>
    </div>
  );
}
