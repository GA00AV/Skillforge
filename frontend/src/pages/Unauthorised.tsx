"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, LogIn, Home, ArrowLeft, User, Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              401 - Unauthorized Access
            </h1>
            <p className="text-gray-600 mb-4 text-lg">
              You don't have permission to access this page. Please log in or
              contact support if you believe this is an error.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-200">
            <div className="flex items-center justify-center mb-2">
              <Lock className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="font-semibold text-red-800">Access Restricted</h3>
            </div>
            <p className="text-sm text-red-700">
              This content requires proper authentication or specific
              permissions to view.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">
              Possible reasons:
            </h3>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• You're not logged in to your account</li>
              <li>• Your session has expired</li>
              <li>• You don't have the required permissions</li>
              <li>• This content is restricted to instructors only</li>
              <li>• Your account needs verification</li>
            </ul>
          </div>

          <div className="space-y-3 mb-6">
            <a href="/login" className="block">
              <Button className="w-full" variant="default">
                <LogIn className="w-4 h-4 mr-2" />
                Sign In to Your Account
              </Button>
            </a>

            <a href="/signup" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                <User className="w-4 h-4 mr-2" />
                Create New Account
              </Button>
            </a>

            <div className="flex gap-2">
              <a href="/" className="flex-1">
                <Button variant="ghost" className="w-full">
                  <Home className="w-4 h-4 mr-2" />
                  Homepage
                </Button>
              </a>

              <Button
                onClick={() => window.history.back()}
                variant="ghost"
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Need Help?</h4>
            <div className="text-sm text-gray-600 space-y-2">
              <p>If you believe you should have access to this content:</p>
              <div className="flex flex-col gap-2">
                <a href="/contact" className="text-blue-600 hover:underline">
                  Contact Support Team
                </a>
                <a href="/help" className="text-blue-600 hover:underline">
                  Visit Help Center
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              <strong>Security Notice:</strong> This attempt has been logged for
              security purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
