import { BrowserRouter, Route, Routes } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import HomePage from "./pages/Home.tsx";
import SearchPage from "./pages/Search.tsx";
import CoursePage from "./pages/Course.tsx";
import LoginPage from "./pages/login.tsx";
import SignupPage from "./pages/signup.tsx";
import DashboardLayout from "./components/layouts/DashboardLayout.tsx";
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
import { UserContext } from "./context/UserContext.ts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "./lib/utils.ts";
import ProtectedRouteLayout from "./components/layouts/ProtectedRouteLayout.tsx";
import LoggedOutRequiredLayout from "./components/layouts/LoggedOutRequiredLayout.tsx";
import { Toaster } from "sonner";

export default function App() {
  const userQuery = useQuery({
    queryKey: ["User"],
    queryFn: () => fetchUserDetails("http://localhost:3000/user"),
    staleTime: 1000 * 60 * 30, // 1 minutes
    refetchInterval: 1000 * 60 * 30, // 1 minutes
  });
  return (
    <BrowserRouter>
      <Toaster />
      <UserContext.Provider value={userQuery}>
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
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<ProfilePage />} />
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
              <Route path="upload-course" element={<UploadCoursePage />} />
              <Route
                path="upload-course/:courseid"
                element={<UploadCoursePage />}
              />
              <Route path="message" element={<MessagePage />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
