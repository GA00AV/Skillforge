import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import HomePage from "./pages/home/Home.tsx";
import SearchPage from "./pages/home/Search.tsx";
import CoursePage from "./pages/home/Course.tsx";
import LoginPage from "./pages/auth/login.tsx";
import SignupPage from "./pages/auth/signup.tsx";
import DashboardLayout from "./components/layouts/DashboardLayout.tsx";
import DashboardPage from "./pages/app/Dashboard.tsx";
import NotificationsPage from "./pages/app/Notifications.tsx";
import MyLearningPage from "./pages/app/Learning.tsx";
import WatchCoursePage from "./pages/app/WatchLec.tsx";
import NotFound from "./components/components/NotFound.tsx";
import MyCoursesPage from "./pages/app/MyCourse.tsx";
import CourseAnalyticsPage from "./pages/app/CourseAnalytics.tsx";
import MessagePage from "./pages/app/Message.tsx";
import ProtectedRouteLayout from "./components/layouts/ProtectedRouteLayout.tsx";
import LoggedOutRequiredLayout from "./components/layouts/LoggedOutRequiredLayout.tsx";
import EditCoursePage from "./pages/app/editCourse.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Route>
        <Route element={<LoggedOutRequiredLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/app" element={<ProtectedRouteLayout />}>
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="learn">
              <Route index element={<MyLearningPage />} />
              <Route path=":courseid" element={<WatchCoursePage />} />
            </Route>
            <Route path="my-courses" element={<MyCoursesPage />} />
            <Route
              path="analytics/:courseid"
              element={<CourseAnalyticsPage />}
            />
            <Route path="edit/:courseid" element={<EditCoursePage />} />
            <Route path="message" element={<MessagePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
