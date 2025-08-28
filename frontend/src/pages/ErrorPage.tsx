import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We encountered an unexpected error. Don't worry, our team has been
              notified and we're working to fix it.
            </p>
            {true && (
              <p className="text-xs text-gray-500 mb-4 font-mono bg-gray-100 p-2 rounded">
                Error ID: 123
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Button className="w-full" variant="default">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Homepage
            </Button>

            <Button
              onClick={() =>
                (window.location.href =
                  "mailto:support@skillforge.com?subject=Error Report&body=Error ID: " +
                  "Unknown")
              }
              variant="ghost"
              className="w-full text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If this problem persists, please contact our support team with the
              error ID above.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
