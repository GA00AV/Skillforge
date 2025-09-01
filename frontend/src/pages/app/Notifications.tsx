import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  Mail,
  MessageSquare,
  BookOpen,
  Clock,
  Trash2,
  Star,
} from "lucide-react";
import { format } from "date-fns";

// Mock data for student notifications
const studentNotifications = [
  {
    id: "1",
    type: "announcement",
    title: "New Bonus Section Added!",
    message:
      "I've added a new bonus section covering advanced JavaScript patterns. Check it out now!",
    course: "JavaScript for Beginners",
    sentDate: "2024-01-20T10:00:00Z",
    read: false,
    archived: false,
  },
  {
    id: "2",
    type: "update",
    title: "Course Content Updated",
    message:
      "The 'Node.js Masterclass' has been updated with new examples and a module on serverless functions.",
    course: "Node.js Masterclass",
    sentDate: "2024-01-18T14:30:00Z",
    read: true,
    archived: false,
  },
  {
    id: "3",
    type: "event",
    title: "Live Q&A Session This Friday",
    message:
      "Join me for a live Q&A session on 'MongoDB Essentials' this Friday at 3 PM EST. Link will be shared soon!",
    course: "MongoDB Essentials",
    sentDate: "2024-01-15T09:00:00Z",
    read: false,
    archived: false,
  },
  {
    id: "4",
    type: "reminder",
    title: "Complete Your Course!",
    message:
      "You're almost done with 'Advanced React Patterns'! Complete the remaining lectures to get your certificate.",
    course: "Advanced React Patterns",
    sentDate: "2024-01-12T11:45:00Z",
    read: true,
    archived: false,
  },
  {
    id: "5",
    type: "announcement",
    title: "Holiday Discount on All Courses!",
    message:
      "Enjoy 20% off all courses for a limited time! Use code HOLIDAY20 at checkout.",
    course: "Skill Forge Admin", // General notification
    sentDate: "2024-01-10T08:00:00Z",
    read: false,
    archived: false,
  },
  {
    id: "6",
    type: "update",
    title: "New Project Added to Course",
    message:
      "A new practical project has been added to the 'JavaScript for Beginners' course. Check it out in Module 5!",
    course: "JavaScript for Beginners",
    sentDate: "2024-01-05T16:00:00Z",
    read: true,
    archived: true,
  },
];

export default function NotificationPage() {
  const [notifications, setNotifications] =
    useState<typeof studentNotifications>(studentNotifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <Bell className="w-5 h-5 text-blue-600" />;
      case "update":
        return <MessageSquare className="w-5 h-5 text-green-600" />;
      case "event":
        return <Clock className="w-5 h-5 text-purple-600" />;
      case "reminder":
        return <Star className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case "announcement":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Announcement
          </Badge>
        );
      case "update":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Update
          </Badge>
        );
      case "event":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Event
          </Badge>
        );
      case "reminder":
        return (
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-700 border-orange-200"
          >
            Reminder
          </Badge>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  //   const filteredNotifications = notifications.filter((notif) => {
  //     if (activeTab === "inbox") {
  //       return !notif.archived;
  //     } else if (activeTab === "unread") {
  //       return !notif.read && !notif.archived;
  //     } else if (activeTab === "archived") {
  //       return notif.archived;
  //     }
  //     return true;
  //   });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Notifications</h1>
          <p className="text-gray-600 mt-1">
            View and manage all your course notifications and announcements.
          </p>
        </div>
      </div>

      {/* Notification Tabs */}
      <div className="w-full">
        {notifications.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-250px)] pr-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className="mb-4 bg-gray-50 border-l-4 border-gray-300 py-0"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 flex items-start space-x-4">
                      <div className="pt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">
                            {notification.title}
                          </h3>
                          {getNotificationBadge(notification.type)}
                        </div>
                        <p className="text-sm text-gray-600 flex items-center mb-2">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {notification.course}
                          <span className="mx-2 text-gray-400">•</span>
                          <Clock className="w-3 h-3 mr-1" />
                          {format(
                            new Date(notification.sentDate),
                            "MMM d, yyyy 'at' hh:mm a"
                          )}
                        </p>
                        <p className="text-gray-700 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNotification(notification.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        ) : (
          <Card className="border-gray-200">
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Mail className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No messages in this folder
              </h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
