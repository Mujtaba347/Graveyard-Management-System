import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bell, CheckCircle2, AlertCircle, Info, Trash2, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "info" | "warning" | "success" | "booking";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationsProps {
  onBack: () => void;
}

export function Notifications({ onBack }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "booking",
      title: "New Booking Request",
      message: "A new grave plot booking has been submitted for Section A-105",
      date: "2024-12-24 10:30 AM",
      read: false
    },
    {
      id: "2",
      type: "success",
      title: "Payment Confirmed",
      message: "Payment received for plot B-203. Booking confirmed.",
      date: "2024-12-23 3:15 PM",
      read: false
    },
    {
      id: "3",
      type: "warning",
      title: "Maintenance Required",
      message: "Section C requires scheduled maintenance. Please review.",
      date: "2024-12-22 9:00 AM",
      read: true
    },
    {
      id: "4",
      type: "info",
      title: "System Update",
      message: "Graveyard Management System has been updated to version 2.1",
      date: "2024-12-20 2:30 PM",
      read: true
    },
    {
      id: "5",
      type: "booking",
      title: "Booking Reminder",
      message: "Burial scheduled for tomorrow at Section D-401",
      date: "2024-12-19 11:00 AM",
      read: true
    },
    {
      id: "6",
      type: "success",
      title: "QR Code Generated",
      message: "QR code successfully generated for grave plot E-305",
      date: "2024-12-18 4:45 PM",
      read: true
    },
    {
      id: "7",
      type: "warning",
      title: "Capacity Alert",
      message: "Section A is 90% occupied. Consider planning for expansion.",
      date: "2024-12-17 1:20 PM",
      read: true
    },
    {
      id: "8",
      type: "info",
      title: "New User Registered",
      message: "New user account created: john.doe@example.com",
      date: "2024-12-15 10:00 AM",
      read: true
    }
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const getIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "booking":
        return <Calendar className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "warning":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "success":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "booking":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === "all" || (filter === "unread" && !notification.read)
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
    toast.success("Notification marked as read");
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast.success("Notification deleted");
  };

  const handleDeleteAll = () => {
    const readNotifications = notifications.filter(n => n.read);
    setNotifications(notifications.filter(n => !n.read));
    toast.success(`${readNotifications.length} read notifications deleted`);
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-slate-100">Notifications</h1>
              {unreadCount > 0 && (
                <Badge className="bg-emerald-700 text-white">{unreadCount} new</Badge>
              )}
            </div>
            <p className="text-slate-300 text-sm mt-1">Stay updated with system alerts and messages</p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-slate-700 text-slate-100 border-slate-600 hover:bg-slate-600">
            Back to Dashboard
          </Button>
        </div>

        <Card className="border-slate-700 bg-slate-50">
          <CardHeader className="bg-slate-900 text-white rounded-t-lg border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-slate-100">Notification Center</CardTitle>
                <CardDescription className="text-slate-300">Manage all your notifications</CardDescription>
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    onClick={handleMarkAllAsRead}
                    variant="outline"
                    size="sm"
                    className="bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark All Read
                  </Button>
                )}
                <Button
                  onClick={handleDeleteAll}
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Read
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={filter} onValueChange={(value) => setFilter(value as "all" | "unread")}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Notifications</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={filter} className="space-y-3">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <Bell className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <p>No {filter === "unread" ? "unread" : ""} notifications</p>
                  </div>
                ) : (
                  filteredNotifications.map(notification => (
                    <Card 
                      key={notification.id} 
                      className={`border-2 transition-all ${
                        !notification.read 
                          ? "border-emerald-200 bg-emerald-50/50" 
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-1">
                              <h4 className="text-slate-900">
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                                )}
                              </h4>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getTypeColor(notification.type)}`}
                              >
                                {notification.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-slate-500">{notification.date}</p>
                              <div className="flex gap-2">
                                {!notification.read && (
                                  <Button
                                    onClick={() => handleMarkAsRead(notification.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 h-7 text-xs"
                                  >
                                    <Mail className="w-3 h-3 mr-1" />
                                    Mark Read
                                  </Button>
                                )}
                                <Button
                                  onClick={() => handleDelete(notification.id)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-300 text-red-700 hover:bg-red-50 h-7 text-xs"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
