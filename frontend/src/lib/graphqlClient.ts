import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
const graphQLclient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/course",
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
const GET_BASIC_COURSEINFO = gql`
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

const GET_COURSE_SECTIONS = gql`
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

const UPLOAD_BASIC_COURSEINFO = gql`
  mutation UpdateCourseBasicInfo($data: CourseInput!) {
    updateCourseBasicInfo(data: $data) {
      courseid
      url
    }
  }
`;
const UPLOAD_COURSE_SECTIONS = gql`
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
export {
  graphQLclient,
  GET_BASIC_COURSEINFO,
  UPLOAD_BASIC_COURSEINFO,
  GET_COURSE_SECTIONS,
  UPLOAD_COURSE_SECTIONS,
};
