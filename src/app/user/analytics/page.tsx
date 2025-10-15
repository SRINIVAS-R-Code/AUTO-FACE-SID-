
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Analytics</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart2 /> Productivity Overview</CardTitle>
          <CardDescription>
            This page will show your personal analytics and productivity metrics. This is a placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Analytics content goes here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
