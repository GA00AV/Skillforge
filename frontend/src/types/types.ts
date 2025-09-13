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
export type MyCoursesReturnType = {
  coursesByInstructorId: {
    id: string;
    price: number;
    thumbnail: string;
    title: string;
  }[];
};
export type SearchedCoursesReturnType = {
  coursesBySearch: {
    id: string;
    thumbnail: string;
    title: string;
    price: number;
    category: string;
    instructor: {
      name: string;
    };
  }[];
};
export interface SectionType {
  id: string;
  title: string;
  lectures: {
    id: string;
    title: string;
    description: string;
    duration: number;
    src: string;
  }[];
}
export interface CourseSectionsReturn {
  course: {
    sections: SectionType[];
  };
}

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
    duration: number;
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
export type CourseDetailInfoReturn = {
  course: Course;
};
export type Course = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  price: number;
  instructor: {
    name: string;
    profileImg: string;
  };
  sections: {
    id: string;
    title: string;
    lectures: {
      id: string;
      title: string;
      duration: number;
    }[];
  }[];
};
