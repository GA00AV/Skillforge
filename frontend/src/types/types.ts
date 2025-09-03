export type BasicCourseReturn = {
  course: {
    category: string;
    description: string;
    id: string;
    price: number;
    thumbnail: string | null;
    title: string;
  };
};

export type ThumbnailUploadUrl = {
  updateCourseBasicInfo: {
    courseid: string;
    url: string | null;
  };
};
