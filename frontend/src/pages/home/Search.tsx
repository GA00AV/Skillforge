import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, Users, Clock, Search, Filter } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      rating: 4.8,
      students: 12543,
      duration: "42 hours",
      price: 89.99,
      originalPrice: 199.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Advanced React and Redux",
      instructor: "Mike Chen",
      rating: 4.7,
      students: 8932,
      duration: "28 hours",
      price: 69.99,
      originalPrice: 149.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Development",
      level: "Advanced",
    },
    {
      id: 3,
      title: "Data Science with Python",
      instructor: "Dr. Emily Rodriguez",
      rating: 4.9,
      students: 15678,
      duration: "56 hours",
      price: 99.99,
      originalPrice: 229.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Data Science",
      level: "Intermediate",
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Thompson",
      rating: 4.6,
      students: 6754,
      duration: "32 hours",
      price: 79.99,
      originalPrice: 179.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Design",
      level: "Beginner",
    },
    {
      id: 5,
      title: "Digital Marketing Masterclass",
      instructor: "Jennifer Lee",
      rating: 4.5,
      students: 9876,
      duration: "24 hours",
      price: 59.99,
      originalPrice: 129.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Marketing",
      level: "Intermediate",
    },
    {
      id: 6,
      title: "Machine Learning A-Z",
      instructor: "David Wilson",
      rating: 4.8,
      students: 11234,
      duration: "48 hours",
      price: 109.99,
      originalPrice: 249.99,
      image: "/placeholder.svg?height=200&width=300",
      category: "Data Science",
      level: "Advanced",
    },
  ];

  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Data Science",
    "Business",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Course
          </h1>
          <form className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-gray-500"
              />
            </div>
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white h-12 px-8"
            >
              Search
            </Button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="border-gray-200">
              <CardHeader>
                <h3 className="font-semibold text-gray-900 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category.toLowerCase()}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Price</h4>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="0-50">$0 - $50</SelectItem>
                      <SelectItem value="50-100">$50 - $100</SelectItem>
                      <SelectItem value="100+">$100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Rating</h4>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm text-gray-700 flex items-center"
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {rating} & up
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-3 left-3 bg-gray-900 text-white">
                        {course.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.instructor}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${course.price}
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
