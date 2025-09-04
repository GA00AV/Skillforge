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

export async function uploadData(url: string, data: any) {
  let response = await fetch(url, {
    method: "PUT",
    body: data,
  });
  if (!response.ok) {
    throw Error(response.statusText);
  }
}
