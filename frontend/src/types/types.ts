import { z } from "zod";

export type BasicCourseReturn = {
  course: {
    category: string;
    description: string;
    id: string;
    price: number;
    thumbnail: string;
    title: string;
  };
};

export type ThumbnailUploadUrl = {
  updateCourseBasicInfo: {
    courseid: string;
    url: string | null;
  };
};

export type LectureInput = {
  id: string;
  title: string;
  description: string;
  duration?: number;
  upload?: boolean;
};
export type SectionInput = {
  id: string;
  title: string;
  lectures?: LectureInput[];
};

export type SectionFormType = {
  id: string;
  title: string;
  lectures?: {
    id: string;
    title: string;
    description: string;
    video: File | null;
    uploadProgress: number;
  }[];
};
export type SectionFormError = {
  id?: string;
  title?: string;
  lectures?: {
    id?: string;
    title?: string;
    description?: string;
    video?: string;
  }[];
};
