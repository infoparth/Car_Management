"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("login Response: ", response);
      toast({
        title: "Successfully logged in",
        description: "You'll be redirected to the profile page",
      });

      router.push("./profile");
    } catch (error: any) {
      console.log("Some issue here", error);

      if (error.response.data.error === "Invalid password") {
        toast({
          title: "Wrong Password",
          description: "Re-enter your password",
          variant: "destructive",
        });
      } else if (error.response.data.error === "User not found") {
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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" onClick={onLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <Toaster />
    </div>
  );
}
