
import { NotificationsPanel } from "@/components/notifications-panel";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Notifications</h1>
        <Button asChild variant="outline">
          <Link href="/user/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      <NotificationsPanel />
    </div>
  );
}
