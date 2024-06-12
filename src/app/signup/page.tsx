"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
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

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup response: ", response);
      if (response.data.status === 201) {
        toast({
          title: "Signup Success",
          description: "You've signed up successfully",
        });
        router.push("/login");
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        console.log("Some errorr");
      }
    } catch (error: any) {
      console.log("Sign up failed:", error.response.status);
      if (error.response.status === 405) {
        console.log("try again");
        toast({
          title: "You cannot use the same email address",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
        console.log("try again");
      }
    }
  };
  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={user.first_name}
                  onChange={(e) =>
                    setUser({ ...user, first_name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  required
                  value={user.last_name}
                  onChange={(e) =>
                    setUser({ ...user, last_name: e.target.value })
                  }
                />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" onClick={onSignUp}>
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
}
