import ErrorForComponent from "@/components/components/ErrorForComponent";
import LoadingScreen from "@/components/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GET_MY_COURSES } from "@/lib/graphqlClient";
import { type MyCoursesReturnType } from "@/types/types";
import { useQuery as useQueryGraphQL } from "@apollo/client/react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

export default function MyCoursesPage() {
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
  console.log(user.user.id);
  const { data, loading, error } = useQueryGraphQL<MyCoursesReturnType>(
    GET_MY_COURSES,
    { variables: { id: user.user.id } }
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (data?.coursesByInstructorId) {
      setCourses(data.coursesByInstructorId);
    }
  }, [data]);
  function handleCreateCourse() {
    const id = uuidv4();
    navigate(`/app/edit/${id}`);
  }
  if (loading) {
    console.log("loading data");
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorForComponent name={error.name} error={error.message} />;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">
            Manage your published and draft courses.
          </p>
        </div>
        <Button
          onClick={handleCreateCourse}
          className="bg-gray-900 hover:bg-gray-800 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
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
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                <Link to={`/course/${course.id}`}>{course.title}</Link>
              </h3>
              <p className="text-sm text-gray-600 mb-3">₹{course.price}</p>

              <div className="pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span />
                  <Link to={`/app/edit/${course.id}`}>
                    <Button
                      size="sm"
                      className="bg-gray-900 hover:bg-gray-800 text-white"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                </div>
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
              "You haven't created any courses yet.
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Course
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
