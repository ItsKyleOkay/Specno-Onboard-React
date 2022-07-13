import React, { useContext, useMemo } from "react";
import UserProvider from "../providers/UserProvider";
import { UserContext } from "../providers/UserProvider";
import ContentQuiz from "../EmployeeMainPage/ContentQuiz";
import ContentData from "../EmployeeMainPage/ContentData";
import Quiz from "../EmployeeMainPage/Quiz";
import { Routes, Route, Navigate } from "react-router-dom";
import Onboard from "../EmployeeMainPage/Onboard";
import Students from "../TeacherMainPage/Students";
import AdminProfile from "./AdminProfile";
import SearchStudents from "../TeacherMainPage/SearchStudents";
import SearchCourses from "../TeacherMainPage/Courses";
import Reports from "../TeacherMainPage/Report";
import SearchAccounting from "../TeacherMainPage/SearchingCourses/Accounting";
import SearchScience from "../TeacherMainPage/SearchingCourses/Science";
import SearchStudentsBisho27 from "../TeacherMainPage/SearchingStudents/SearchingBisho27";
import SearchMaths from "../TeacherMainPage/SearchingCourses/Maths";
import SearchStudentsBisho25 from "../TeacherMainPage/SearchingStudents/SearchingBisho25";
import SearchStudentsSoweto from "../TeacherMainPage/SearchingStudents/SearchingSoweto";
import SearchStudentsKWT from "../TeacherMainPage/SearchingStudents/SearchingKWT";
import SearchStudentsAll from "../TeacherMainPage/SearchingStudents/SearchingAll";
import SearchICT from "../TeacherMainPage/SearchingCourses/ICT";
import SoftSearch from "../TeacherMainPage/SoftSearch";
import Content from "../EmployeeMainPage/ContentQuiz";
import PageLoading from "./PageLoading";

//main routes
const ProfilePage = React.lazy(() => import("./ProfilePage"));
const Leaderboard = React.lazy(() => import("../EmployeeMainPage/Leaderboard"));

const QuizSection = React.lazy(() => import("../EmployeeMainPage/QuizSection"));
const SignIn = React.lazy(() => import("./SignIn"));
const SignUp = React.lazy(() => import("./SignUp"));

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

      <Route path="/search" element={<SoftSearch />} />
      <Route path="/sign-up" element={<Navigate to="/login" />} />
      <Route path="/password-reset" element={<Navigate to="/profile" />} />
      <Route path="/specno-quiz-content" element={<ContentQuiz />} />
      <Route path="/specno-quiz-content/data" element={<ContentData />} />
      <Route path="/specno-quiz" element={<Quiz />} />
      <Route path="/onboard" element={<Onboard />} />
      <Route
        path="/leaderboard"
        element={
          <React.Suspense fallback={<PageLoading />}>
            <Leaderboard />
          </React.Suspense>
        }
      />
      <Route path="/students-list" element={<Students />} />
      <Route path="/admin-profile" element={<AdminProfile />} />
      <Route path="/search-students" element={<SearchStudents />} />
      <Route path="/search-courses" element={<SearchCourses />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/search-course-accounting" element={<SearchAccounting />} />
      <Route path="/search-course-science" element={<SearchScience />} />
      <Route path="/search-course-maths" element={<SearchMaths />} />
      <Route path="/search-course-ict" element={<SearchICT />} />
      <Route
        path="/search-students-bisho27"
        element={<SearchStudentsBisho27 />}
      />
      <Route
        path="/search-students-bisho25"
        element={<SearchStudentsBisho25 />}
      />
      <Route
        path="/search-students-soweto"
        element={<SearchStudentsSoweto />}
      />
      <Route path="/search-students-kwt" element={<SearchStudentsKWT />} />
      <Route path="/search-students-all" element={<SearchStudentsAll />} />
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
