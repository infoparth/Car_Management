import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

export default function ProfilePage({ params }: any) {
  return (
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
  );
}
