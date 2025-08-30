export interface Lecture {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadProgress: number;
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface CourseInfo {
  instructor: {
    name: string;
    email: string;
    profileImg: string;
  };
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string | null;
  lastUpdate: Date;
  price: number;
  status: string;
  instructorId: string;
}
