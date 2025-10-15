import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function ComplianceReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Compliance Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileText /> Compliance Reports</CardTitle>
          <CardDescription>
            This page will display compliance reports. This is a placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Compliance reports content goes here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
