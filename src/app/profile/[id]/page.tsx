import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import backgroundImg from "@/assets/ford2.png";

export default function ProfilePage({ params }: any) {
  console.log(params);
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <div className="flex items-start justify-start min-h-screen bg-black bg-opacity-50 p-8">
        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Welcome to your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <h2>
                  Your Name here
                  <span className="p-2 ml-2 rounded bg-orange-500  text-black">
                    {params.id}
                  </span>
                </h2>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <h2>Something here</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
