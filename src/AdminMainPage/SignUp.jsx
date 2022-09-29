import React, { useContext, useState } from "react";
import { auth, generateUserDocument } from "../firebase";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import Popup from "reactjs-popup";

const AddEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherpassword, setTeacherPassword] = useState();
  const [employee, setEmployee] = useState(true);
  const [Age, setAge] = useState();
  const [Department, setDepartment] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [displayName, setDisplayName] = useState("");
  const [DateTime, setDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  var failed = "";
  var Done = "";
  var Bio = "";
  var Level = 1;
  var RecentScore = 0;
  var Progress = 0;
  var FinalScore = 0;
  var Badge = "1";
  var ID = "";
  var Difficulty = "";

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
        { employee },
        { Age },
        { Department },
        { DateTime },
        { failed },
        { Done },
        { Bio },
        { Level },
        { RecentScore },
        { Progress },
        { FinalScore },
        { Badge },
        { ID },
        { Difficulty }
      );
      isChecked ? navigate("/profile") : navigate("/admin-profile");
    } catch (error) {
      setError("The email or password doesnt meet requirements");
    }
    // firebase functions of creating a users account
    setEmail("");
    setPassword("");
    setDisplayName("");
    setDate("");
    setEmployee(false);
  };
  const createTeacherWithEmailAndPasswordHandler = async (email, password) => {
    setIsChecked(false);
    setEmployee(false);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(
        user,
        { displayName },
        { employee },
        { Age },
        { Department },
        { DateTime },
        { failed },
        { Bio },
        { Level },
        { RecentScore },
        { Progress },
        { FinalScore },
        { Badge },
        { ID },
        { Difficulty }
      );
      navigate("/admin-profile");
    } catch (error) {
      setError("Please make sure that every field has a value");
    }
    // firebase functions of creating a users account
    setEmail("");
    setPassword("");
    setDisplayName("");
    setDate("");
    setEmployee(false);
    //Dont even know why I did this with the states. I think I just wanted each state to get empty once a user is added #unnecessary
  };

  function CheckPassword() {
    if (teacherpassword === "123Specno#") {
      createTeacherWithEmailAndPasswordHandler(email, password);
    }
  }
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "date") {
      setDate(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    } else if (name === "userDepartment") {
      setDepartment(value);
    } else if (name === "userAge") {
      setAge(value);
    } else if (name === "teacherpassword") {
      setTeacherPassword(value);
      setIsChecked(false);
      setEmployee(false);
    } else if (name === "Employee") {
      setIsChecked(isChecked);
      setEmployee(isChecked);
    }
  };
  //Honestly, the code on this page was mostly my old code and took long unnecessary lengths to do things
  // instead of creating new css classes I just added it to the jsx code
  return (
    <div className="mt-8">
      <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <form className="">
          <label htmlFor="displayName" className="block">
            Full name:
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
          <label htmlFor="date" className="block">
            Date:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full "
            name="date"
            value={DateTime}
            placeholder="28 Sep 2022"
            id="date"
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
          <label htmlFor="userDepartment" className="block">
            Department:
          </label>
          <input
            type="text"
            className="my-1 p-1 w-full"
            name="userDepartment"
            value={Department}
            placeholder="Finance, Dev, admin"
            id="userDepartment"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userAge" className="block">
            Age:
          </label>
          <input
            type="number"
            className="mt-1 mb-3 p-1 w-full"
            name="userAge"
            value={Age}
            min="18"
            max="65"
            placeholder="Employees age"
            id="userAge"
            onChange={(event) => onChangeHandler(event)}
          />
          <Popup
            trigger={
              <input
                type="checkbox"
                id="Employee"
                name="Employee"
                value={employee}
                checked={isChecked}
                onChange={(event) => onChangeHandler(event)}
              />
            }
            position="right"
          >
            <div className="popupAdmin">
              <div className=" ml-20  p-1 w-full">
                Admin please enter the password
              </div>
              <input
                type="text"
                className="mt-1 ml-20 mb-1 p-1 w-full"
                name="teacherpassword"
                defaultValue={teacherpassword}
                placeholder="Admin Password"
                id="teacherpassword"
                onChange={(event) => onChangeHandler(event)}
              />
              <button onClick={CheckPassword} className="AddUser2">
                Check
              </button>
            </div>
          </Popup>
          Employee
          <br></br>
          <br></br>
          {error !== null && <div className="wrong-info">{error}</div>}
          <button
            className="AddUser"
            onClick={() => {
              navigate("/employee-list");
            }}
          >
            Back
          </button>
          <button
            className="AddUser"
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
