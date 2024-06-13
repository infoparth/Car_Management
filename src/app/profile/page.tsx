"use client";

import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const router = useRouter();
  const { toast } = useToast();

  const [user, setUser] = useState("");
  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast({
        title: "Logged Out successfully",
        description: "Logged out successfully",
      });
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Unable to log out",
        description: "There was a problem with your request.",
        variant: "destructive",
      });
    }
  };

  const getDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      console.log(res.data.data.first_name);
      setUser(res.data.data.first_name);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  console.log("user is ", user);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Welcome to your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <h2>Your Name here</h2>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <h2>Something here</h2>
            </div>
          </div>
        </CardContent>
      </Card>
      <Label>
        {" "}
        {user === "" ? (
          "Not Fetched"
        ) : (
          <Link href={`/profile/${user}`}>{user}</Link>
        )}
      </Label>
      <Button onClick={logout}> Logout</Button>
      <Button onClick={getDetails}> Get User Details</Button>
      <Toaster />
    </>
  );
}
