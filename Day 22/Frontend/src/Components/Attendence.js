import React, { useEffect, useState } from 'react';
import './Attendence.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Attendance() {
  const nav = useNavigate();
  const token = localStorage.getItem("jwtToken");
  if (token === null) {
    nav("/login");
  }

  const [students, setStudents] = useState([]);
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [attendanceData, setAttendanceData] = useState([
    { name: 'Present', value: 0 },
    { name: 'Absent', value: 0 },
  ]);

  const getDayWiseAttendanceReport = (hour, date) => {
    
    const reversedDate = date.split('-').reverse().join('-');
        axios.get(`http://localhost:8080/attendence/get/${hour}/${reversedDate
      }`)
      .then((response) => {
        console.log(response)
        const report = {};
        // Map the received data to the student attendance
        response.data.forEach((attendanceRecord) => {
          report[attendanceRecord.studentId] = attendanceRecord.value === 'Present';
        });
        setAttendance(report);
        calculateAttendanceStatistics();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateAttendanceStatistics = () => {
    const presentCount = Object.values(attendance).filter((value) => value === true).length;
    const absentCount = Object.values(attendance).filter((value) => value === false).length;
    setAttendanceData([
      { name: 'Present', value: presentCount },
      { name: 'Absent', value: absentCount },
    ]);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    getDayWiseAttendanceReport(selectedHour, formattedDate);
  };

  return (
    <div className="attendance">
      <Typography variant="h5">Attendance Report</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel htmlFor="hourSelect">Select an Hour</InputLabel>
            <Select
              id="hourSelect"
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
            >
              <MenuItem value={1}>Hour 1</MenuItem>
              <MenuItem value={2}>Hour 2</MenuItem>
              <MenuItem value={3}>Hour 3</MenuItem>
              <MenuItem value={4}>Hour 4</MenuItem>
              <MenuItem value={5}>Hour 5</MenuItem>
              <MenuItem value={6}>Hour 6</MenuItem>
              <MenuItem value={7}>Hour 7</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="calendar-container">
            <Typography>Select a Date:</Typography>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
          </div>
        </Grid>
      </Grid>

      {selectedHour && (
        <div className="attendance-report">
          <Typography variant="h6">
            Attendance Report for Hour {selectedHour}
          </Typography>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentName}</td>
                  <td>{attendance[student.studentId] ? 'Present' : 'Absent'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className="attendance-statistics">
            <Typography variant="h6">Attendance Statistics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={attendanceData}
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#FF8042"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Present' ? '#0088FE' : '#FF8042'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="attendance-summary">
            <Typography variant="h6">Attendance Summary</Typography>
            <Typography>Total Present: {attendanceData.find((entry) => entry.name === 'Present').value}</Typography>
            <Typography>Total Absent: {attendanceData.find((entry) => entry.name === 'Absent').value}</Typography>
          </div>
        </Grid>
      </Grid>

      <div className="print-button">
        <Button variant="contained" color="primary" onClick={() => window.print()}>
          Print Report
        </Button>
      </div>
    </div>
  );
}

export default Attendance;
