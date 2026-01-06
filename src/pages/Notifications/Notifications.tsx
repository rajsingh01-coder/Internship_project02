import React, { useState, useEffect } from 'react';
import { Card } from '@/components/common/Card/Card';
import { NotificationItem } from '@/components/Notification/NotificationItem';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { fetchNotifications, Notification } from '@/utils/api';
import { Loader2, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchNotifications();
      setNotifications(data);
      setIsLoading(false);
    };
    loadNotifications();
  }, []);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <main className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <span className="h-6 px-2 rounded-full bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead}>
                Mark all as read
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border rounded-xl p-1">
              <TabsTrigger value="all" className="flex-1 rounded-lg">
                All
              </TabsTrigger>
              <TabsTrigger value="mentions" className="flex-1 rounded-lg">
                Mentions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Card className="overflow-hidden divide-y divide-border">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium">No notifications yet</p>
                    <p className="text-muted-foreground text-sm">
                      When you get notifications, they'll show up here
                    </p>
                  </div>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="mentions" className="mt-4">
              <Card className="overflow-hidden">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">No mentions yet</p>
                  <p className="text-muted-foreground text-sm">
                    When someone mentions you, it'll show up here
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Notifications;
