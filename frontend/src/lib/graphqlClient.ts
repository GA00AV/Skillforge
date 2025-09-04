import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
const graphQLclient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:3000/course",
    credentials: "include",
  }),
  cache: new InMemoryCache(),
});

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
const UPLOAD_BASIC_COURSEINFO = gql`
  mutation UpdateCourseBasicInfo($data: CourseInput!) {
    updateCourseBasicInfo(data: $data) {
      courseid
      url
    }
  }
`;
export { graphQLclient, GET_BASIC_COURSEINFO, UPLOAD_BASIC_COURSEINFO };
