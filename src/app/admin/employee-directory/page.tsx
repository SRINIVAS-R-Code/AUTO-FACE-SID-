import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function EmployeeDirectoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Employee Directory</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users /> Employee Directory</CardTitle>
          <CardDescription>
            This page will display a directory of all employees. This is a placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Employee directory content goes here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
