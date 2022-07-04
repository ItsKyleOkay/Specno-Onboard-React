import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

import classes from "./Onboard.module.css";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Kyle Kretschmer", "July 3, 2022 11:36 AM", "Medium", "Dev", "89"),
  createData("Abdullah", "April 12, 2022 7:49 AM", "Easy", "Finance", "67"),
  createData("john smith", "January 13, 2022 10:53 AM", "Easy", "Dev", "60"),
];

export default function BasicTable() {
  return (
    <div>
      <span className={classes.header}>
        <div className={classes.logo}>Specno</div>
        <nav>
          <ul>
            <li>
              <a href="/profile">Home</a>
            </li>
            <li>
              <a href="/specno-quiz-content">Content</a>
            </li>
            <li>
              <a href="/specno-quiz">Quizzes</a>
            </li>
            <li>
              <a href="/specno-blog">Blog</a>
            </li>
            <li>
              <a href="/leaderboard">Leaderboard</a>
            </li>
          </ul>
        </nav>
      </span>
      <div className={classes.contentcontainer}>
        <div className={classes.row}>
          <div className={classes.leftpanel}>
            <div className={classes.leaderboard}>
              <h1 className={classes.firsthead}>Best of specno</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player Name</TableCell>
                      <TableCell align="right">Date and Time</TableCell>
                      <TableCell align="right">Difficulty</TableCell>
                      <TableCell align="right">Department</TableCell>
                      <TableCell align="right">Final Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <div>
              <div className={classes.leaderboard}>
                <h1 className={classes.firsthead}>Recent Activity</h1>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Player Name</TableCell>
                        <TableCell align="right">Date and Time</TableCell>
                        <TableCell align="right">Difficulty</TableCell>
                        <TableCell align="right">Department</TableCell>
                        <TableCell align="right">Added Points</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
          <div className={classes.rightpanel}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 3fr)",
                gridGap: 20,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 4fr)",
                  gridGap: 20,
                }}
              >
                <div className={classes.boxstyle}>
                  <div className={classes.PrizeHead}>Top 3 Prizes</div>
                  <div>Hamburger voucher</div>
                  <div>Work day off</div>
                  <div>Choose work theme</div>
                </div>
              </div>
              <div className={classes.box2style}>
                <div className={classes.PrizeHead}>Your progress</div>
                <div>Level: 8</div>
                <div>Progress: 314 exp gained</div>
                <div>Rank : #09</div>
              </div>

              <div className={classes.box3style}>
                <div className={classes.PrizeHead}>Your badges</div>
                <div>Badge 1</div>
                <div>Badge 2</div>
                <div>Badge 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
