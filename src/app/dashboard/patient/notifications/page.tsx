"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification as NotificationType } from "@/lib/types";
import { Bell, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch notifications
        const notificationsQuery = query(
          collection(db, "notifications"), 
          where("patientUid", "==", currentUser.uid),
          orderBy("date", "desc")
        );
        const notificationsSnapshot = await getDocs(notificationsQuery);
        const allNotifications = notificationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NotificationType));
        setNotifications(allNotifications);
      } else {
        setUser(null);
        setNotifications([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold font-headline mb-8">Notifications</h1>
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold font-headline mb-8">Please log in to see your notifications.</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Notifications</h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card key={notification.id} className={cn("transition-all", notification.read ? "bg-card/50" : "bg-card")}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <div className={cn("p-2 rounded-full mt-1", notification.read ? "bg-muted" : "bg-primary/20")}>
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
          ))
        ) : (
          <div className="text-center py-16 border rounded-lg">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Notifications Yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Your new notifications will appear here.
              </p>
          </div>
        )}
      </div>
    </div>
  );
}
