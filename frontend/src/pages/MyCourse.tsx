import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  MoreVertical,
  Edit,
  Eye,
  Users,
  DollarSign,
  Star,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router";

export default function MyCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  const courses = [
    {
      id: 1,
      title: "JavaScript for Beginners",
      status: "published",
      students: 1250,
      revenue: 1875.5,
      rating: 4.8,
      reviews: 234,
      lastUpdated: "2024-01-15",
      image: "/placeholder.svg?height=120&width=200",
      price: 89.99,
    },
    {
      id: 2,
      title: "Node.js Masterclass",
      status: "published",
      students: 890,
      revenue: 1335.75,
      rating: 4.7,
      reviews: 156,
      lastUpdated: "2024-01-10",
      image: "/placeholder.svg?height=120&width=200",
      price: 99.99,
    },
    {
      id: 3,
      title: "MongoDB Essentials",
      status: "draft",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-20",
      image: "/placeholder.svg?height=120&width=200",
      price: 79.99,
    },
    {
      id: 4,
      title: "Advanced React Patterns",
      status: "processing",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-18",
      image: "/placeholder.svg?height=120&width=200",
      price: 129.99,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case "processing":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">
            Manage your published and draft courses.
          </p>
        </div>
        <Link to="/app/upload-course">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </Link>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="border-gray-200 hover:shadow-lg transition-shadow py-0"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(course.status)}
                </div>
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 hover:bg-white"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">${course.price}</p>

              {course.status === "published" && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span>${course.revenue.toFixed(2)}</span>
                    </div>
                  </div>

                  {course.rating > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                      <span>({course.reviews} reviews)</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Updated {new Date(course.lastUpdated).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2">
                  {course.status === "published" && (
                    <Link to={`/app/analytics/${course.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 bg-transparent"
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Analytics
                      </Button>
                    </Link>
                  )}
                  <a href={`/app/upload-course/${course.id}`}>
                    <Button
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't created any courses yet."}
            </p>
            <a href="/upload-course">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Course
              </Button>
            </a>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={courseToDelete !== null}
        onOpenChange={() => setCourseToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be
              undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseToDelete(null)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
