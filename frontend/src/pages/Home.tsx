import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Learn Without Limits
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Start, switch, or advance your career with more than 5,000
                courses, Professional Certificates, and degrees from world-class
                instructors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/search">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-5.5 rounded-sm">
                    Explore Courses
                  </Button>
                </a>
                <a href="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 bg-transparent rounded-sm py-5.25"
                  >
                    Start Learning Today
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">50K+</div>
                <div className="text-gray-600">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">5K+</div>
                <div className="text-gray-600">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">1K+</div>
                <div className="text-gray-600">Instructors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on Skill Forge. Start
              your journey today with our expert-led courses.
            </p>
            <a href="/signup">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 rounded-sm py-5.5"
              >
                Get Started Now
              </Button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
