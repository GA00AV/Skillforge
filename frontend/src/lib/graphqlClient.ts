import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const graphQLclient = new ApolloClient({
  link: new HttpLink({
    uri: `${API_URL}/course`,
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});
export const GET_MY_COURSES = gql`
  query coursesByInstructorId($id: String!) {
    coursesByInstructorId(instructorId: $id) {
      id
      title
      thumbnail
      price
    }
  }
`;
export const GET_ENROLLED_COURSES = gql`
  query coursesByStudentId($id: String!) {
    coursesByStudentId(studentid: $id) {
      id
      title
      thumbnail
      price
    }
  }
`;
export const GET_BASIC_COURSEINFO = gql`
  query GetBasicCourseInfo($id: String!) {
    course(id: $id) {
      id
      title
      description
      category
      price
      thumbnail
    }
  }
`;
export const GET_SEARCHED_COURSE = gql`
  query GetSearchedCourse($query: String) {
    coursesBySearch(query: $query) {
      id
      thumbnail
      title
      price
      category
      instructor {
        name
      }
    }
  }
`;
export const GET_COURSE_SECTIONS = gql`
  query GetSections($id: String!) {
    course(id: $id) {
      sections {
        id
        title
        lectures {
          id
          title
          description
          duration
          src
        }
      }
    }
  }
`;

export const UPLOAD_BASIC_COURSEINFO = gql`
  mutation UpdateCourseBasicInfo($data: CourseInput!) {
    updateCourseBasicInfo(data: $data) {
      courseid
      url
    }
  }
`;
export const UPLOAD_COURSE_SECTIONS = gql`
  mutation UpdateSections($data: SectionsInput!) {
    updateSections(data: $data) {
      Sections {
        sectionId
        Lectures {
          lectureId
          url
        }
      }
    }
  }
`;
export const ENROLL_STUDENT = gql`
  mutation enrollStudent($courseID: String!, $studentID: String!) {
    enrollStudent(courseID: $courseID, studentID: $studentID)
  }
`;

export const GET_COURSE_INFO = gql`
  query GETCOURSE($id: String!) {
    course(id: $id) {
      id
      thumbnail
      title
      description
      category
      price
      instructor {
        name
        profileImg
      }
      sections {
        id
        title
        lectures {
          id
          title
          duration
        }
      }
    }
  }
`;
