import React, { useContext, useMemo } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import RegisterCourse from "../StudentMainPage/RegisterCourse";
import RegisterCourseKwt from "../StudentMainPage/RegisterKWT";
import RegisterCourseBisho from "../StudentMainPage/RegisterBisho27";
import RegisterCourseSoweto from "../StudentMainPage/RegisterSoweto";
import RegisterCourseBisho25 from "../StudentMainPage/RegisterBisho25";
import DeRegisterCourse from "../StudentMainPage/DeRegister";
import DeRegisterCourseInfo from "../StudentMainPage/DeRegisterCourse";
import { Routes, Route, Navigate } from "react-router-dom";
import Marks from "../StudentMainPage/Marks";
import Students from "../TeacherMainPage/Students";
import TeacherProfile from "../Components/TeacherProfile";
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

function Application() {
  const user = useContext(UserContext);
  const storedUser = useMemo(() => user, [user]);
  return storedUser ? (
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/search" element={<SoftSearch />} />
      <Route path="/sign-up" element={<Navigate to="/login" />} />
      <Route path="/password-reset" element={<Navigate to="/profile" />} />
      <Route path="/register" element={<RegisterCourse />} />
      <Route path="/de-register" element={<DeRegisterCourse />} />
      <Route path="/de-register-info" element={<DeRegisterCourseInfo />} />
      <Route path="/marks" element={<Marks />} />
      <Route path="/students-list" element={<Students />} />
      <Route path="/teacher-profile" element={<TeacherProfile />} />
      <Route path="/search-students" element={<SearchStudents />} />
      <Route path="/search-courses" element={<SearchCourses />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/register-course-kwt" element={<RegisterCourseKwt />} />
      <Route
        path="/register-course-bisho27"
        element={<RegisterCourseBisho />}
      />
      <Route
        path="/register-course-soweto"
        element={<RegisterCourseSoweto />}
      />
      <Route
        path="/register-course-bisho25"
        element={<RegisterCourseBisho25 />}
      />
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
