import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router";
import { useQuery as useQueryGraphQL } from "@apollo/client/react";
import { GET_SEARCHED_COURSE } from "@/lib/graphqlClient";
import LoadingScreen from "@/components/components/LoadingScreen";
import ErrorForComponent from "@/components/components/ErrorForComponent";
import { useEffect, useState } from "react";
import { type SearchedCoursesReturnType } from "@/types/types";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("query"));
  const { data, loading, error } = useQueryGraphQL<SearchedCoursesReturnType>(
    GET_SEARCHED_COURSE,
    {
      variables: { query: searchParams.get("query") },
    }
  );
  const [courses, setCourses] = useState<
    {
      id: string;
      thumbnail: string;
      title: string;
      price: number;
      category: string;
      instructor: {
        name: string;
      };
    }[]
  >([]);
  useEffect(() => {
    if (data?.coursesBySearch) {
      setCourses(data.coursesBySearch);
    }
  }, [data]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorForComponent name={error.name} error={error.message} />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Course
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Results */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="bg-white border-gray-200 hover:shadow-lg transition-shadow py-0"
                >
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-gray-900 text-white">
                        {course.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="py-0 px-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.instructor.name}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{course.price}
                        </span>
                      </div>
                      <a href={`/course/${course.id}`}>
                        <Button
                          size="sm"
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          View Course
                        </Button>
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
