import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

export default function InternalServerError() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Something Went Wrong!
            </h1>
            <p className="text-gray-600 mb-4 text-lg">
              We're experiencing some technical difficulties on our end. Our
              team has been automatically notified and is working to resolve
              this issue.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <a href="/" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Return to Homepage
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
