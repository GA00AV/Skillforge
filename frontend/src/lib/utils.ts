import type { CourseInfo } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export async function fetchUserDetails(url: string) {
  const response = await fetch(url, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export async function logout(url: string) {
  const response = await fetch(url, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
  return response.json();
}
export async function fetchCourseDetails(
  url: string,
  courseid: string
): Promise<CourseInfo | null> {
  const response = await fetch(url, {
    credentials: "include",
  });
  if (response.ok) {
    return response.json();
  }
  if (response.status === 404) {
    return null;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
}
