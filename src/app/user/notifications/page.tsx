
import { NotificationsPanel } from "@/components/notifications-panel";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">My Notifications</h1>
      <NotificationsPanel />
    </div>
  );
}
