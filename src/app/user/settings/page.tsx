
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function UserSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your personal account settings. This is a placeholder page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="your.email@company.com" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Change Password</Label>
            <Input id="password" type="password" placeholder="Enter new password" disabled />
          </div>
          <Button disabled>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
