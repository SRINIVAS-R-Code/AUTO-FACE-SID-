import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>
            Manage system configuration and preferences. This is a placeholder page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="camera-config">Camera Configuration</Label>
            <Input id="camera-config" placeholder="e.g., Default resolution" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notification-settings">Notification Settings</Label>
            <Input id="notification-settings" placeholder="e.g., Email alerts" disabled />
          </div>
          <Button disabled>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
