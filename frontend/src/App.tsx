import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import HomePage from "./pages/home/Home.tsx";
import SearchPage from "./pages/home/Search.tsx";
import CoursePage from "./pages/home/Course.tsx";
import LoginPage from "./pages/auth/login.tsx";
import SignupPage from "./pages/auth/signup.tsx";
import DashboardLayout from "./components/layouts/DashboardLayout.tsx";
import MyLearningPage from "./pages/app/Learning.tsx";
import WatchCoursePage from "./pages/app/WatchLec.tsx";
import NotFound from "./components/components/NotFound.tsx";
import MyCoursesPage from "./pages/app/MyCourse.tsx";
import ProtectedRouteLayout from "./components/layouts/ProtectedRouteLayout.tsx";
import LoggedOutRequiredLayout from "./components/layouts/LoggedOutRequiredLayout.tsx";
import EditCoursePage from "./pages/app/editCourse.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { graphQLclient } from "./lib/graphqlClient.ts";
export default function App() {
  return (
    <ApolloProvider client={graphQLclient}>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/course/:courseid" element={<CoursePage />} />
          </Route>
          <Route element={<LoggedOutRequiredLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

          <Route path="/app" element={<ProtectedRouteLayout />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<MyLearningPage />} />
              <Route path="learn/:courseid" element={<WatchCoursePage />} />
              <Route path="my-courses" element={<MyCoursesPage />} />

              <Route path="edit/:courseid" element={<EditCoursePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}
