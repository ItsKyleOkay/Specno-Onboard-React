import React, { useState, useEffect } from "react";
import classes from "./Employee.module.css";
import { db } from "../firebase";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getPostsFromFirebase = [];
    const userinfo = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
    return () => userinfo();
  }, [loading]); // empty dependencies array => useEffect only called once
  return (
    <div>
      <AdminNavbar />
      <div>
        <div className={classes.navdist}>
          <div className="SearchEmployee">
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              placeholder="Search"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
            />
            <button
              className="AddUser"
              onClick={() => {
                navigate("/add-employee");
              }}
            >
              Add Employee
            </button>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    data-testid="header"
                    style={{ fontWeight: "bold" }}
                  >
                    Employee Name
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>

                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Department
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Age
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: "bold" }}>
                    Final Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {(row.Department !== "Admin") &
                    row.displayName
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ? (
                      <>
                        <TableCell component="th" scope="row">
                          {row.displayName}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>

                        <TableCell align="right">{row.Department}</TableCell>
                        <TableCell align="right">{row.Age}</TableCell>
                        <TableCell align="right">{row.FinalScore}</TableCell>
                      </>
                    ) : null}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Employee;
