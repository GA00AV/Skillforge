import { useState, type FormEvent } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, redirect, useNavigate } from "react-router";
import { toast } from "sonner";

async function submitLogin(data: any) {
  let response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok && response.status !== 400) {
    throw Error(response.statusText);
  }
  return response.json();
}

export default function LoginPage() {
  let queryclient = useQueryClient();
  let mutation = useMutation({
    mutationFn: (data: any) => submitLogin(data),
    onSuccess(data, _variables, _context) {
      queryclient.invalidateQueries({ queryKey: ["User"] });
      if (!data.errors) {
        navigate("/");
      }
    },
  });
  let navigate = useNavigate();
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    mutation.mutate({
      email: formdata.get("email"),
      password: formdata.get("password"),
    });
  }
  const errors = mutation.data?.errors;

  if (mutation.isError) {
    toast(`Error: ${mutation.error.message}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 mb-6"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">SF</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Skill Forge
            </span>
          </Link>
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
            <form className="space-y-4" onSubmit={handleFormSubmit}>
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
                {errors &&
                  (errors.email ? (
                    <div className="flex items-center space-x-1 text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-xs">{errors.email}</span>
                    </div>
                  ) : (
                    ""
                  ))}
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
                {errors &&
                  (errors.password ? (
                    <div className="flex items-center space-x-1 text-red-600">
                      <AlertCircle className="h-3 w-3" />
                      <span className="text-xs">{errors.password}</span>
                    </div>
                  ) : (
                    ""
                  ))}
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              >
                {mutation.isPending ? "Signing In" : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-600">
              {"Don't have an account? "}
              <Link
                to="/signup"
                className="text-gray-900 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
