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
import { Plus, MoreVertical, Star, Play } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router";

export default function MyLearningPage() {
  const [searchQuery] = useState("");
  const [filterStatus] = useState("all");
  const [courseToReview, setCourseToReview] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [currentRating, setCurrentRating] = useState(0);
  //   const { toast } = useToast();

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "JavaScript for Beginners",
      status: "in-progress", // Can be 'completed', 'in-progress', 'not-started'
      progress: 75,
      lastAccessed: "2024-02-20",
      image: "/placeholder.svg?height=120&width=200&text=JavaScript",
      userRating: 4, // User's rating for this course
      userReview: "Great course, very comprehensive!",
    },
    {
      id: 2,
      title: "Node.js Masterclass",
      status: "completed",
      progress: 100,
      lastAccessed: "2024-01-10",
      image: "/placeholder.svg?height=120&width=200&text=Node.js",
      userRating: 5,
      userReview: "Absolutely fantastic! Learned so much.",
    },
    {
      id: 3,
      title: "MongoDB Essentials",
      status: "not-started",
      progress: 0,
      lastAccessed: "2024-01-25",
      image: "/placeholder.svg?height=120&width=200&text=MongoDB",
      userRating: 0,
      userReview: "",
    },
    {
      id: 4,
      title: "Advanced React Patterns",
      status: "in-progress",
      progress: 30,
      lastAccessed: "2024-02-18",
      image: "/placeholder.svg?height=120&width=200&text=React",
      userRating: 0,
      userReview: "",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "not-started":
        return <Badge className="bg-gray-100 text-gray-800">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleOpenReviewDialog = (courseId: number) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setCourseToReview(courseId);
      setReviewText(course.userReview || "");
      setCurrentRating(course.userRating || 0);
    }
  };

  const handleSubmitReview = () => {
    if (courseToReview !== null) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseToReview
            ? { ...course, userReview: reviewText, userRating: currentRating }
            : course
        )
      );
      //   toast({
      //     title: "Review Submitted!",
      //     description: "Your course review and rating have been saved.",
      //   });
      setCourseToReview(null);
      setReviewText("");
      setCurrentRating(0);
    }
  };

  const handleStarClick = (rating: number, courseId?: number) => {
    if (courseId) {
      // Quick rating from card
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, userRating: rating } : course
        )
      );
      //   toast({
      //     title: "Rating Updated!",
      //     description: `You rated this course ${rating} stars.`,
      //   });
    } else {
      // Rating in dialog
      setCurrentRating(rating);
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

  const getRatingLabel = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>
          <p className="text-gray-600 mt-2">
            Continue your learning journey and manage your courses.
          </p>
        </div>
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
                      <DropdownMenuItem
                        onClick={() => handleOpenReviewDialog(course.id)}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        {course.userRating > 0
                          ? "Edit Review"
                          : "Rate & Review"}
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

              <div className="flex flex-col gap-3 justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-600">Your rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 cursor-pointer ${
                        star <= course.userRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <Link to={`/app/learn/${course.id}`}>
                  <Button
                    size="sm"
                    className="bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Continue
                  </Button>
                </Link>
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
              You haven't enrolled in any courses yet!
            </p>
            <Link to="/search">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Review Dialog */}
      <Dialog
        open={courseToReview !== null}
        onOpenChange={() => setCourseToReview(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate & Review Course</DialogTitle>
            <DialogDescription>
              Share your experience with "
              {courses.find((c) => c.id === courseToReview)?.title}".
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Your Rating:</h4>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= currentRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
                {currentRating > 0 && (
                  <span className="ml-2 text-sm text-gray-600">
                    ({getRatingLabel(currentRating)})
                  </span>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Your Review:</h4>
              <Textarea
                placeholder="Write your review here (max 500 characters)..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                maxLength={500}
                rows={5}
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {reviewText.length} / 500 characters
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCourseToReview(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={currentRating === 0 && reviewText.trim() === ""}
            >
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
