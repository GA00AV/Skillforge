"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { type Course, type CourseDetailInfoReturn } from "@/types/types";
import { ENROLL_STUDENT, GET_COURSE_INFO } from "@/lib/graphqlClient";
import { Link, useNavigate, useParams } from "react-router";
import LoadingScreen from "@/components/components/LoadingScreen";
import ErrorForComponent from "@/components/components/ErrorForComponent";
import { useEffect, useState } from "react";
import useUserQuery from "@/hooks/useUserQuery";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function toTime(timeInSecs: number) {
  const hours = Math.floor(timeInSecs / 3600);
  const minutes = Math.floor((timeInSecs % 3600) / 60);
  const seconds = Math.floor(timeInSecs % 60);
  return `${hours}:${minutes}:${seconds}`;
}

export default function CoursePage() {
  const params = useParams();
  const navigate = useNavigate();
  const [enroll] = useMutation<{ enrollStudent: boolean }>(ENROLL_STUDENT);
  const [course, setCourse] = useState<Course>();
  const [isENROLLED, setIsEnrolled] = useState<boolean>(false);
  const { data, loading, error } = useQuery<CourseDetailInfoReturn>(
    GET_COURSE_INFO,
    { variables: { id: params.courseid } }
  );
  const { data: userData } = useUserQuery();
  useEffect(() => {
    async function fetchIsEnrolled() {
      let response = await fetch(`${API_URL}/isEnrolled`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          courseID: params.courseid,
          studentID: userData.user.id,
        }),
        credentials: "include",
      });
      let data = await response.json();
      if (data.success) {
        setIsEnrolled(true);
      }
    }
    if (userData && userData.user) {
      fetchIsEnrolled();
    }
  }, [userData]);

  async function enrollStudent() {
    if (userData !== undefined && userData.user) {
      const data = await enroll({
        variables: { courseID: params.courseid, studentID: userData.user.id },
      });
      if (data.data?.enrollStudent) {
        navigate("/app");
      }
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    if (data?.course) {
      setCourse(data.course);
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
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="bg-gray-700 text-gray-200 mb-4">
                {course?.category.toUpperCase()}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course?.title}
              </h1>

              <div className="flex items-center gap-4 mt-6">
                <img
                  src={course?.instructor.profileImg}
                  alt={course?.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-300">Created by</p>
                  <p className="font-semibold">{course?.instructor.name}</p>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 sticky top-8 rounded-md py-0">
                <CardHeader className="p-0">
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="px-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{course?.price}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {isENROLLED ? (
                      <Link to={"/app"}>
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-lg">
                          GO TO COURSE
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        onClick={enrollStudent}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-lg"
                      >
                        BUY NOW
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:col-span-2 lg:pr-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {course?.description}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              {course?.sections.map((section) => (
                <Card key={section.id} className="border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-900">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.lectures.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            <Play className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-700">
                              {lesson.title}
                            </span>
                          </div>
                          {lesson.duration && (
                            <span className="text-sm text-gray-500 font-mono">
                              {toTime(lesson.duration)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
