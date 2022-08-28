import React, { useContext, useMemo } from "react";
import UserProvider from "../providers/UserProvider";
import { UserContext } from "../providers/UserProvider";
import ContentQuiz from "../EmployeeMainPage/ContentQuiz";
import ContentData from "../EmployeeMainPage/ContentData";
import Quiz from "../EmployeeMainPage/Quiz";
import { Routes, Route, Navigate } from "react-router-dom";
import Employees from "../AdminMainPage/Employees";
import SearchStudents from "../AdminMainPage/SearchStudents";
import PageLoading from "./PageLoading";

import ContentAdmin from "../AdminMainPage/ContentAdmin";
import QuizAdmin from "../AdminMainPage/QuizAdmin";
import LeaderboardAdmin from "../AdminMainPage/LeaderboardAdmin";
import ContentAdminData from "../AdminMainPage/ContentAdminData";

//main routes
const ProfilePage = React.lazy(() => import("./ProfilePage"));
const Leaderboard = React.lazy(() => import("../EmployeeMainPage/Leaderboard"));
const AdminProfile = React.lazy(() => import("./AdminProfile"));
const QuizSection = React.lazy(() => import("../EmployeeMainPage/QuizSection"));
const SignIn = React.lazy(() => import("./SignIn"));
const SignUp = React.lazy(() => import("./SignUp"));

const FinishedQuiz = React.lazy(() =>
  import("../EmployeeMainPage/FinishedQuiz")
);
const PasswordReset = React.lazy(() => import("./PasswordReset"));

function Application() {
  const user = useContext(UserContext);
  const storedUser = useMemo(() => user, [user]);
  return storedUser ? (
    <Routes>
      <Route
        path="/profile"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <ProfilePage />
          </React.Suspense>
        }
      />
      <Route
        path="/specno-quiz/data"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <QuizSection />
          </React.Suspense>
        }
      />

      <Route path="/sign-up" element={<Navigate to="/login" />} />
      <Route path="/password-reset" element={<Navigate to="/profile" />} />
      <Route path="/specno-quiz-content" element={<ContentQuiz />} />
      <Route path="/specno-quiz-content/data" element={<ContentData />} />
      <Route path="/specno-quiz" element={<Quiz />} />
      <Route
        path="/leaderboard"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <Leaderboard />
          </React.Suspense>
        }
      />
      <Route
        path="/admin-profile"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <AdminProfile />
          </React.Suspense>
        }
      />

      <Route path="/content-admin" element={<ContentAdmin />} />
      <Route path="/quiz-admin" element={<QuizAdmin />} />
      <Route path="/leaderboard-admin" element={<LeaderboardAdmin />} />
      <Route path="/employee-list" element={<Employees />} />
      <Route path="/search-students" element={<SearchStudents />} />

      <Route path="/content-admin/data" element={<ContentAdminData />} />

      <Route
        path="/specno-quiz/data/complete"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <FinishedQuiz />
          </React.Suspense>
        }
      />
    </Routes>
  ) : (
    // if a user is logged in and if the user === student
    // if a user is logged in then the profilepage will load
    // sign up feature was removed but just here incase someone wants to add again for testing purposes
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/sign-up"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <SignUp />
          </React.Suspense>
        }
      />

      <Route
        path="/login"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <SignIn />
          </React.Suspense>
        }
      />

      <Route
        path="/password-reset"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <PasswordReset />
          </React.Suspense>
        }
      />
    </Routes>
    // adding the paths for the signup, signin and password reset
  );
}

export default Application;
