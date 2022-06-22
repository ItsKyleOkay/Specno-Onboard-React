import React, { useContext, useState } from "react";
import { auth, generateUserDocument } from "../firebase";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import Popup from "reactjs-popup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherpassword, setTeacherPassword] = useState();
  const [admin, setAdmin] = useState(true);
  const [centre, setCentre] = useState("");
  const [MathsMark, setMaths] = useState("");
  const [AccountingMark, setAccounting] = useState("");
  const [ScienceMark, setScience] = useState("");
  const [ICTMark, setICT] = useState("");
  const [parentpdf, setparentpdf] = useState(false);
  const [Department, setDepartment] = useState();
  const [isChecked, setIsChecked] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(isChecked);
  console.log(admin);
  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(
        user,
        { displayName },
        { admin },
        { centre },
        { MathsMark },
        { ScienceMark },
        { AccountingMark },
        { ICTMark },
        { Department },
        { parentpdf }
      );
      isChecked ? navigate("/profile") : navigate("/teacher-profile");
    } catch (error) {
      setError("Error Signing up with email and password");
    }
    // firebase functions of creating a users account
    setEmail("");
    setPassword("");
    setDisplayName("");
    setAdmin(false);
  };
  const createTeacherWithEmailAndPasswordHandler = async (email, password) => {
    setIsChecked(false);
    setAdmin(false);
    console.log(admin);
    console.log(admin + " yhoooh");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(
        user,
        { displayName },
        { admin },
        { centre },
        { MathsMark },
        { ScienceMark },
        { AccountingMark },
        { ICTMark },
        { Department },
        { parentpdf }
      );
      navigate("/teacher-profile");
    } catch (error) {
      setError("Error Signing up with email and password");
    }
    // firebase functions of creating a users account
    setEmail("");
    setPassword("");
    setDisplayName("");
    setAdmin(false);
  };

  function CheckPassword() {
    if (teacherpassword === "123specno#") {
      createTeacherWithEmailAndPasswordHandler(email, password);
    }
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "userGrade") {
      setDepartment(value);
    } else if (name === "teacherpassword") {
      setTeacherPassword(value);
      setIsChecked(false);
      setAdmin(false);
    } else if (name === "student") {
      setIsChecked(isChecked);
      setAdmin(isChecked);
    }
  };
  // instead of creating new css classes I just added it to the jsx code
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="displayName" className="block">
            Display Name:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="displayName"
            value={displayName}
            placeholder="E.g: John Doe"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: example123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password - 6 characters or more"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userGrade" className="block">
            Department:
          </label>
          <input
            type="text"
            className="mt-1 mb-3 p-1 w-full"
            name="userDepartment"
            placeholder="Finance, Dev, Admin"
            id="userGrade"
            onChange={(event) => onChangeHandler(event)}
          />
          <Popup
            trigger={
              <input
                type="checkbox"
                id="admin"
                name="admin"
                value={admin}
                checked={isChecked}
                onChange={(event) => onChangeHandler(event)}
              />
            }
            position="left"
          >
            <div>Please enter the password</div>
            <input
              type="text"
              className="mt-1 mb-3 p-1 w-full"
              name="teacherpassword"
              defaultValue={teacherpassword}
              placeholder="Admin Password"
              id="adminpassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <button
              onClick={CheckPassword}
              className="bg-blue-300 hover:bg-blue-500 py-2 text-white"
            >
              Check
            </button>
          </Popup>
          Employee
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>

        <p className="text-center my-3">
          Already have an account?
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
