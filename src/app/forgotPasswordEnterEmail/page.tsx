"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import React, { useState } from "react";
import backgroundImg from "@/assets/ford3.png"; // Import your background image

export default function ForgorPassCreds() {
  const [email, setEmail] = useState("");
  const [mailSent, setMailSent] = useState(false);

  const { toast } = useToast();

  const callBackend = async () => {
    try {
      const res = await axios.post("/api/users/forgotPassword", { email });
      console.log(res);
      setMailSent(true);
      toast({
        title: "Email Sent",
        description: "Check your email address",
      });
    } catch (error: any) {
      console.log(error);
      if (error.response.data.error === "User not Found") {
        toast({
          title: "Email not found",
          description: "Check your email address",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed to Login",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-start justify-start p-8"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm">
        {mailSent ? (
          <h1 className="text-xl font-bold">
            Check your Email, the verification link has been sent
          </h1>
        ) : (
          <div className="space-y-4">
            <Label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Enter your email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <Button onClick={callBackend} className="w-full mt-4">
              Submit
            </Button>
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}
