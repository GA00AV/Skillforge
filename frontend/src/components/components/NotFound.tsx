import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              404 - Page Not Found
            </h1>
            <p className="text-gray-600 mb-4 text-lg">
              The page you're looking for doesn't exist or has been moved to a
              different location.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              What can you do?
            </h3>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• Check the URL for any typos</li>
              <li>• Use the search function to find what you're looking for</li>
              <li>• Browse our course catalog</li>
              <li>• Return to the homepage</li>
            </ul>
          </div>

          <div className="space-y-3 mb-6">
            <a href="/search" className="block">
              <Button className="w-full" variant="default">
                <Search className="w-4 h-4 mr-2" />
                Search Courses
              </Button>
            </a>

            <a href="/" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </a>

            <Button
              onClick={() => window.history.back()}
              variant="ghost"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-800 mb-3">
              Popular Sections
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a
                href="/my-learning"
                className="text-blue-600 hover:underline flex items-center"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                My Learning
              </a>
              <a
                href="/my-courses"
                className="text-blue-600 hover:underline flex items-center"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                My Courses
              </a>
              <a
                href="/dashboard"
                className="text-blue-600 hover:underline flex items-center"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Dashboard
              </a>
              <a
                href="/teach"
                className="text-blue-600 hover:underline flex items-center"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Teach
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
