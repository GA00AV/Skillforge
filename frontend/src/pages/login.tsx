import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [errors, setErrors] = useState<
    Record<string, string | undefined | boolean>
  >({});

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <a
            href="/"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SF</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Skill Forge
            </span>
          </a>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="text-gray-600 mt-2">
            Sign in to your account to continue learning
          </p>
        </div>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border-gray-300 focus:border-gray-500"
                  required
                />
                {errors["email"] && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">{errors["email"]}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border-gray-300 focus:border-gray-500 pr-10"
                  required
                />
                {errors["password"] && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    <span className="text-xs">{errors["password"]}</span>
                  </div>
                )}
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Forgot password?
                </a>
              </div> */}

              <Button
                type="submit"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <a
                href="/signup"
                className="text-gray-900 hover:underline font-medium"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
