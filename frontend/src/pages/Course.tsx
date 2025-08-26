"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Clock, Play, CreditCard } from "lucide-react";

export default function CoursePage() {
  const course = {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    instructorImage: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    totalRatings: 12543,
    students: 45678,
    duration: "42 hours",
    lectures: 156,
    level: "All Levels",
    language: "English",
    price: 89.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=400&width=600",
    category: "Development",
    lastUpdated: "December 2024",
    certificate: true,
    downloadable: true,
    mobileAccess: true,
    lifetimeAccess: true,
  };

  const curriculum = [
    {
      section: "Getting Started",
      lectures: 8,
      duration: "2h 30m",
      lessons: [
        { title: "Course Introduction", duration: "15:30", type: "video" },
        {
          title: "Setting up Development Environment",
          duration: "25:45",
          type: "video",
        },
        { title: "Course Resources", duration: null, type: "pdf" },
        { title: "HTML Basics", duration: "35:20", type: "video" },
        { title: "HTML Cheat Sheet", duration: null, type: "pdf" },
        { title: "CSS Fundamentals", duration: "42:15", type: "video" },
        { title: "CSS Reference Guide", duration: null, type: "pdf" },
        { title: "Practice Exercise 1", duration: "18:30", type: "video" },
      ],
    },
    {
      section: "JavaScript Essentials",
      lectures: 15,
      duration: "5h 45m",
      lessons: [
        { title: "Variables and Data Types", duration: "28:45", type: "video" },
        { title: "JavaScript Syntax Guide", duration: null, type: "pdf" },
        { title: "Functions and Scope", duration: "32:20", type: "video" },
        { title: "DOM Manipulation", duration: "45:30", type: "video" },
        { title: "DOM Methods Reference", duration: null, type: "pdf" },
        { title: "Event Handling", duration: "38:15", type: "video" },
        { title: "Event Types Cheat Sheet", duration: null, type: "pdf" },
        { title: "Async JavaScript", duration: "52:40", type: "video" },
        { title: "Promises and Async/Await", duration: "41:25", type: "video" },
        { title: "JavaScript Best Practices", duration: null, type: "pdf" },
        { title: "ES6+ Features", duration: "36:50", type: "video" },
        { title: "Module System", duration: "29:35", type: "video" },
        { title: "Error Handling", duration: "24:15", type: "video" },
        { title: "Debugging Techniques", duration: "31:20", type: "video" },
        { title: "JavaScript Project", duration: "48:30", type: "video" },
      ],
    },
    {
      section: "React Development",
      lectures: 20,
      duration: "8h 20m",
      lessons: [
        { title: "React Introduction", duration: "22:15", type: "video" },
        { title: "React Setup Guide", duration: null, type: "pdf" },
        { title: "React Components", duration: "35:40", type: "video" },
        { title: "JSX Syntax", duration: "28:20", type: "video" },
        { title: "Props and State", duration: "42:30", type: "video" },
        { title: "React Hooks Guide", duration: null, type: "pdf" },
        { title: "useState Hook", duration: "31:45", type: "video" },
        { title: "useEffect Hook", duration: "38:25", type: "video" },
        { title: "Custom Hooks", duration: "29:50", type: "video" },
        { title: "Context API", duration: "45:15", type: "video" },
        { title: "React Router", duration: "52:30", type: "video" },
        { title: "Routing Best Practices", duration: null, type: "pdf" },
        { title: "Form Handling", duration: "33:20", type: "video" },
        { title: "API Integration", duration: "41:40", type: "video" },
        { title: "State Management", duration: "48:25", type: "video" },
        { title: "Redux Fundamentals", duration: "55:30", type: "video" },
        { title: "Redux Toolkit", duration: "43:15", type: "video" },
        { title: "Testing React Apps", duration: "39:45", type: "video" },
        { title: "Performance Optimization", duration: "46:20", type: "video" },
        { title: "React Final Project", duration: "62:30", type: "video" },
      ],
    },
  ];

  const reviews = [
    {
      name: "John Smith",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Excellent course! Very comprehensive and well-structured. The instructor explains everything clearly.",
    },
    {
      name: "Maria Garcia",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great content and practical examples. Helped me land my first developer job!",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="bg-gray-700 text-gray-200 mb-4">
                {course.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-300">
                    ({course.totalRatings.toLocaleString()} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} total</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  <span>{course.lectures} lectures</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <img
                  src={course.instructorImage || "/placeholder.svg"}
                  alt={course.instructor}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-300">Created by</p>
                  <p className="font-semibold">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Course Preview Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-gray-200 sticky top-8 rounded-md py-0">
                <CardHeader className="p-0">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="px-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      $200
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
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
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
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
                    <p>
                      This comprehensive web development course will take you
                      from complete beginner to job-ready developer. You'll
                      learn the most in-demand skills including HTML, CSS,
                      JavaScript, React, Node.js, and much more.
                    </p>
                    <p>
                      The course is project-based, meaning you'll build
                      real-world applications that you can add to your
                      portfolio. By the end of this course, you'll have the
                      skills and confidence to start your career as a web
                      developer.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-4">
              {curriculum.map((section, index) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-gray-900">
                        {section.section}
                      </CardTitle>
                      <div className="text-sm text-gray-600">
                        {section.lectures} lectures • {section.duration}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.type === "video" ? (
                              <Play className="w-4 h-4 text-gray-600" />
                            ) : (
                              <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  PDF
                                </span>
                              </div>
                            )}
                            <span className="text-gray-700">
                              {lesson.title}
                            </span>
                            {lesson.type === "pdf" && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-red-50 text-red-700 border-red-200"
                              >
                                File
                              </Badge>
                            )}
                          </div>
                          {lesson.duration && (
                            <span className="text-sm text-gray-500 font-mono">
                              {lesson.duration}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">
                    Student Reviews
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold">
                        {course.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({course.totalRatings.toLocaleString()} reviews)
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 pb-6 last:border-b-0"
                      >
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {review.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
