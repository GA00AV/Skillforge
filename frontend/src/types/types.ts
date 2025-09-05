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
export type CourseSectionsReturn = {
  course: {
    sections: {
      id: string;
      title: string;
      lectures: {
        id: string;
        title: string;
        description: string;
        src: string;
      }[];
    }[];
  };
};

export type ThumbnailUploadUrl = {
  updateCourseBasicInfo: {
    courseid: string;
    url: string | null;
  };
};
export type UploadVideosType = {
  updateSections: {
    Sections: {
      sectionId: string;
      Lectures: { lectureId: string; url: string }[];
    }[];
  };
};
export type SectionFormType = {
  id: string;
  title: string;
  lectures: {
    id: string;
    title: string;
    description: string;
    video: null | File;
    upload: boolean;
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

export type UploadSections = {
  sections: {
    id: string;
    title: string;
    lectures: LectureType[];
  }[];
  courseId: string;
  deletedLectures: string[];
  deletedSections: string[];
};
export type LectureType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  upload: boolean;
};
