import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Star } from "lucide-react";

export default function CourseAnalyticsPage() {
  const courseData = {
    title: "JavaScript for Beginners",
    totalStudents: 1250,
    totalRevenue: 1875.5,
    averageRating: 4.8,
    totalReviews: 234,
    averageWatchTime: 28.5,
    completionRate: 67,
  };

  const stats = [
    {
      title: "Total Students",
      value: courseData.totalStudents.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12%",
    },
    {
      title: "Total Revenue",
      value: `$${courseData.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+8%",
    },
    {
      title: "Average Rating",
      value: courseData.averageRating.toString(),
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      change: "+0.2",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Analytics</h1>
          <p className="text-gray-600 mt-2">{courseData.title}</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-gray-200 py-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
