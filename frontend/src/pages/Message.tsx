import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Bell,
  Send,
  BookOpen,
  Star,
  MessageSquare,
  Clock,
  Plus,
} from "lucide-react";
import { format } from "date-fns";

// Mock data
const courses = [
  { id: "1", title: "Complete React Development", students: 1250 },
  { id: "2", title: "Advanced JavaScript", students: 890 },
  { id: "3", title: "Node.js Masterclass", students: 650 },
];

const recentNotifications = [
  {
    id: "1",
    type: "announcement",
    title: "New Assignment Available",
    course: "Complete React Development",
    recipients: 1250,
    sentDate: "2024-01-15T10:30:00Z",
    status: "delivered",
    openRate: 68,
    clickRate: 24,
    message:
      "The 'Node.js Masterclass' has been updated with new examples and a module on serverless functions",
  },
  {
    id: "2",
    type: "update",
    title: "Live Session Starting Soon",
    course: "Advanced JavaScript",
    recipients: 890,
    sentDate: "2024-01-14T14:00:00Z",
    status: "delivered",
    openRate: 85,
    clickRate: 45,
    message:
      "The 'Node.js Masterclass' has been updated with new examples and a module on serverless functions",
  },
  {
    id: "3",
    type: "event",
    title: "Course Update Available",
    course: "Node.js Masterclass",
    recipients: 650,
    sentDate: "2024-01-13T09:15:00Z",
    status: "scheduled",
    openRate: 0,
    clickRate: 0,
    message:
      "The 'Node.js Masterclass' has been updated with new examples and a module on serverless functions",
  },
];

export default function MessagePage() {
  const [targetAudience, setTargetAudience] = useState("all");
  const [category, setcategory] = useState("announcement");
  const [selectedCourse, setSelectedCourse] = useState("");

  const [pushTitle, setPushTitle] = useState("");
  const [pushMessage, setPushMessage] = useState("");
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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Send push notifications to your students
          </p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Notification</DialogTitle>
                <DialogDescription>
                  Send targeted messages to your students via push notifications
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Target Audience */}
                <div className="space-y-3">
                  <Label>Target Audience</Label>
                  <Select
                    value={targetAudience}
                    onValueChange={setTargetAudience}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="course">Specific Course</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Selection */}
                {targetAudience === "course" && (
                  <div className="space-y-3">
                    <Label>Select Course</Label>
                    <Select
                      value={selectedCourse}
                      onValueChange={setSelectedCourse}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.title} ({course.students} students)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {/* Notification category */}
                <div className="space-y-3">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setcategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Push Notification Content */}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="push-title">Notification Title</Label>
                    <Input
                      id="push-title"
                      placeholder="Enter notification title..."
                      value={pushTitle}
                      onChange={(e) => setPushTitle(e.target.value)}
                      maxLength={50}
                    />
                    <p className="text-xs text-gray-500">
                      {pushTitle.length}/50 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="push-message">Message</Label>
                    <Textarea
                      id="push-message"
                      placeholder="Enter your message..."
                      className="min-h-[80px]"
                      value={pushMessage}
                      onChange={(e) => setPushMessage(e.target.value)}
                      maxLength={160}
                    />
                    <p className="text-xs text-gray-500">
                      {pushMessage.length}/160 characters
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4">
                  <div className="space-x-2">
                    <Button>
                      <Send className="w-4 h-4 mr-2" />
                      Send Now
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sent Notifications */}
      <ScrollArea className="h-[calc(100vh-250px)] pr-4">
        {recentNotifications.map((notification) => (
          <Card
            key={notification.id}
            className="mb-4 bg-gray-50 border-l-4 border-gray-300 py-0 w-full"
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
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
