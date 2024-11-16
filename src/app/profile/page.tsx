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
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import backgroundImg from "@/assets/ford2.png"; // Import your background image

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
      console.log("Results are here: ", res);
      console.log(res.data);
      console.log("first_name: ", res.data.data.first_name);
      setUser(res.data.data.firstName);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <div className="flex items-start justify-start min-h-screen bg-black bg-opacity-50 p-8">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Welcome to your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <h2>{user || "Your Name here"}</h2>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <h2>Something here</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-4">
          <Label>
            {user === "" ? (
              "Not Fetched"
            ) : (
              <Link href={`/profile/${user}`}>{user}</Link>
            )}
          </Label>
        </div>
        <div className="mt-4 flex space-x-4">
          <Button onClick={logout}>Logout</Button>
          <Button onClick={getDetails}>Get User Details</Button>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
