import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/HomeLayout.tsx";
import HomePage from "./pages/Home.tsx";
import SearchPage from "./pages/Search.tsx";
import CoursePage from "./pages/Course.tsx";
import LoginPage from "./pages/login.tsx";
import SignupPage from "./pages/signup.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";
import DashboardPage from "./pages/Dashboard.tsx";
import ProfilePage from "./pages/Profile.tsx";
import NotificationsPage from "./pages/Notifications.tsx";
import MyLearningPage from "./pages/Learning.tsx";
import WatchCoursePage from "./pages/WatchLec.tsx";
import NotFound from "./pages/NotFound.tsx";
import MyCoursesPage from "./pages/MyCourse.tsx";
import CourseAnalyticsPage from "./pages/CourseAnalytics.tsx";
import UploadCoursePage from "./pages/CourseUpload.tsx";
import MessagePage from "./pages/Message.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="learn">
            <Route index element={<MyLearningPage />} />
            <Route path=":courseid" element={<WatchCoursePage />} />
          </Route>
          <Route path="my-courses" element={<MyCoursesPage />} />
          <Route path="analytics/:courseid" element={<CourseAnalyticsPage />} />
          <Route path="upload-course" element={<UploadCoursePage />} />
          <Route
            path="upload-course/:courseid"
            element={<UploadCoursePage />}
          />
          <Route path="message" element={<MessagePage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
