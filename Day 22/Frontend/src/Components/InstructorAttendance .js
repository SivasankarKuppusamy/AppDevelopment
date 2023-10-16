import React, { useState, useEffect } from 'react';
import './InstructorAttendance.css';
import { saveAs } from 'file-saver';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AttendanceTable = () => {
  const nav=useNavigate();
  const token=localStorage.getItem("jwtToken")
  if(token===null){
    nav("/login")
    
  }
  const [studentDatabase, setStudentsDatabase] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedClassAttendance, setSelectedClassAttendance] = useState([]);
  const [selectedHour, setSelectedHour] = useState(1);

  const handleAttendanceChange = (studentId) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.studentId === studentId ? { ...student, isPresent: !student.isPresent } : student
      )
    );
  };

  const getAttendanceText = (isPresent) => {
    return isPresent ? 'Present' : 'Absent';
  };

  const generateClassAttendanceData = () => {
    const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${day}-${month}-${year}`;
console.log(currentDate); 
    axios
      .post("http://localhost:8080/attendence", {
        hour: selectedHour,
        date:currentDate, 
        values: attendanceData.map((student) => ({
          studentId: student.studentId,
          value: student.isPresent ? 'Present' : 'Absent',
        })),
      })
      .then((response) => {
if(response.status===200){
  alert(response.data)
  window.location.reload();
}      })
      .catch((error) => {
        alert("Something Went wrong....")
        console.error('Failed to post attendance data:', error);
      });
  };

  const fetchStudentsByDepartmentAndYear = () => {
 
    axios
      .get(`http://localhost:8080/students/department/${selectedDepartment}/year/${selectedYear}`)
      .then((response) => {
        console.log(response)
        setAttendanceData(response.data);
        setStudentsDatabase(response.data);
      })
      .catch((error) => {
        console.error('Failed to fetch students:', error);
      });
  };

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/students/unique/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="att">
      <h2>Attendance</h2>
      <div>
        <label>Department and section:</label>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="class">Select Class</option>
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="Year I">Select Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div>
        <label>Select Hour:</label>
        <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)}>
          <option value={1}>Hour 1</option>
          <option value={2}>Hour 2</option>
          <option value={3}>Hour 3</option>
          <option value={4}>Hour 4</option>
          <option value={5}>Hour 5</option>
          <option value={6}>Hour 6</option>
          <option value={7}>Hour 7</option>
        </select>
      </div>

      <button onClick={fetchStudentsByDepartmentAndYear}>Fetch Students</button>

      <table>
        <thead>
          <tr>
            <th>Register Number</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.contactnum}</td>
              <td>
                <span
                  onClick={() => {
                    handleAttendanceChange(student.studentId);
                  }}
                  style={{
                    cursor: 'pointer',
                    color: student.isPresent ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {getAttendanceText(student.isPresent)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={generateClassAttendanceData}>Submit Class Attendance</button>

      <div className="class-attendance">
        <h3>Class Attendance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={selectedClassAttendance}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="attendancePercentage"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceTable;
