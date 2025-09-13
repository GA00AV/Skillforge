import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Play } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router";
import { useQuery as useQueryGraphQL } from "@apollo/client/react";
import { useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "@/components/components/LoadingScreen";
import ErrorForComponent from "@/components/components/ErrorForComponent";
import { GET_ENROLLED_COURSES } from "@/lib/graphqlClient";

export default function MyLearningPage() {
  const queryclient = useQueryClient();
  const user = queryclient.getQueryData(["User"]) as { user: { id: string } };
  const [courses, setCourses] = useState<
    {
      id: string;
      price: number;
      thumbnail: string;
      title: string;
    }[]
  >([]);
  const { data, loading, error } = useQueryGraphQL<{
    coursesByStudentId: {
      id: string;
      price: number;
      thumbnail: string;
      title: string;
    }[];
  }>(GET_ENROLLED_COURSES, { variables: { id: user.user.id } });

  useEffect(() => {
    if (data?.coursesByStudentId) {
      setCourses(data.coursesByStudentId);
    }
  }, [data]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorForComponent name={error.name} error={error.message} />;
  }

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
        {courses.map((course) => (
          <Card
            key={course.id}
            className="border-gray-200 hover:shadow-lg transition-shadow py-0"
          >
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>

              <div className="flex flex-col gap-3 justify-between pt-3 border-t border-gray-100">
                <span />

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

      {courses.length === 0 && (
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
    </div>
  );
}
