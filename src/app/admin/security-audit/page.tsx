import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function SecurityAuditPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Security Audit</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck /> Security Audit</CardTitle>
          <CardDescription>
            This page will display security audit information. This is a placeholder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Security audit content goes here...</p>
        </CardContent>
      </Card>
    </div>
  );
}
