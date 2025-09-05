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

export function getVideoDuration(file: string | null | File): Promise<number> {
  if (typeof file === "string") {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = file;
      video.onloadedmetadata = () => resolve(video.duration);

      video.onerror = (e) => reject(e.toString());
    });
  }
  if (typeof file === "object") {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file as File);
      video.onloadedmetadata = () => resolve(video.duration);

      video.onerror = (e) => reject(e.toString());
    });
  }
  return new Promise((resolve) => resolve(0));
}
export async function getVideoFile(url: string, filename: string) {
  try {
    if (url) {
      let response = await fetch(url);
      let blob = await response.blob();
      return new File([blob], filename, { type: blob.type });
    }
    return null;
  } catch {
    return null;
  }
}
