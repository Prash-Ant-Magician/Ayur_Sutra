import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { notifications } from "@/lib/data";
import { Bell, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Notifications</h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className={cn("transition-all", notification.read ? "bg-card/50" : "bg-card")}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className={cn("p-2 rounded-full", notification.read ? "bg-muted" : "bg-primary/20")}>
                {notification.read ? 
                    <CheckCircle2 className="w-5 h-5 text-muted-foreground" /> :
                    <Bell className="w-5 h-5 text-primary" />
                }
              </div>
              <div className="grid gap-1">
                <CardTitle>{notification.title}</CardTitle>
                <CardDescription>{notification.description}</CardDescription>
                <div className="text-xs text-muted-foreground flex items-center gap-2 pt-1">
                  <span>{new Date(notification.date).toLocaleString()}</span>
                  {!notification.read && <Badge variant="default" className="h-5">New</Badge>}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
