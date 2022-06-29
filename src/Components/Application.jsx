import React, { useContext, useMemo } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import ContentQuiz from "../EmployeeMainPage/ContentQuiz";
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
import Leaderboard from "../EmployeeMainPage/Leaderboard";

function Application() {
  const user = useContext(UserContext);
  const storedUser = useMemo(() => user, [user]);
  return storedUser ? (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SoftSearch />} />
      <Route path="/sign-up" element={<Navigate to="/login" />} />
      <Route path="/password-reset" element={<Navigate to="/profile" />} />
      <Route path="/specno-quiz-content" element={<ContentQuiz />} />
      <Route path="/specno-quiz" element={<Quiz />} />
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
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
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/password-reset" element={<PasswordReset />} />
    </Routes>
    // adding the paths for the signup, signin and password reset
  );
}

export default Application;
