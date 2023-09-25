import React, { useState } from 'react';
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

const studentDatabase = [
  {
    id: 1,
    name: 'John Smith',
    department: 'ECE A',
    year: 'Year I',
    rollNumber: 'ECEA001',
    contact: '123-456-7890',
    isPresent: true,
  },
  {
    id: 2,
    name: 'Alice Johnson',
    department: 'ECE A',
    year: 'Year I',
    rollNumber: 'ECEA002',
    contact: '234-567-8901',
    isPresent: true,
  },
  {
    id: 3,
    name: 'Michael Brown',
    department: 'ECE B',
    year: 'Year I',
    rollNumber: 'ECEB001',
    contact: '345-678-9012',
    isPresent: true,
  },
  {
    id: 4,
    name: 'Emily Davis',
    department: 'ECE B',
    year: 'Year I',
    rollNumber: 'ECEB002',
    contact: '456-789-0123',
    isPresent: true,
  },
  {
    id: 5,
    name: 'Daniel Lee',
    department: 'EEE A',
    year: 'Year I',
    rollNumber: 'EEEA001',
    contact: '567-890-1234',
    isPresent: true,
  },
  {
    id: 6,
    name: 'Olivia White',
    department: 'EEE A',
    year: 'Year I',
    rollNumber: 'EEEA002',
    contact: '678-901-2345',
    isPresent: true,
  },
  {
    id: 7,
    name: 'William Anderson',
    department: 'EEE B',
    year: 'Year I',
    rollNumber: 'EEEB001',
    contact: '789-012-3456',
    isPresent: true,
  },
  {
    id: 8,
    name: 'Sophia Hall',
    department: 'EEE B',
    year: 'Year I',
    rollNumber: 'EEEB002',
    contact: '890-123-4567',
    isPresent: true,
  },
  {
    id: 9,
    name: 'James Turner',
    department: 'IT A',
    year: 'Year I',
    rollNumber: 'ITA001',
    contact: '901-234-5678',
    isPresent: true,
  },
  {
    id: 10,
    name: 'Ava King',
    department: 'IT A',
    year: 'Year I',
    rollNumber: 'ITA002',
    contact: '012-345-6789',
    isPresent: true,
  },
  {
    id: 11,
    name: 'Benjamin Walker',
    department: 'IT B',
    year: 'Year I',
    rollNumber: 'ITB001',
    contact: '123-456-7890',
    isPresent: true,
  },
  {
    id: 12,
    name: 'Mia Martin',
    department: 'IT B',
    year: 'Year I',
    rollNumber: 'ITB002',
    contact: '234-567-8901',
    isPresent: true,
  },
  {
    id: 13,
    name: 'Ethan Baker',
    department: 'CSE A',
    year: 'Year I',
    rollNumber: 'CSEA001',
    contact: '345-678-9012',
    isPresent: true,
  },
  {
    id: 14,
    name: 'Emma Garcia',
    department: 'CSE A',
    year: 'Year I',
    rollNumber: 'CSEA002',
    contact: '456-789-0123',
    isPresent: true,
  },
  {
    id: 15,
    name: 'Jacob Allen',
    department: 'CSE B',
    year: 'Year I',
    rollNumber: 'CSEB001',
    contact: '567-890-1234',
    isPresent: true,
  },
];const AttendanceTable = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [attendanceData, setAttendanceData] = useState(studentDatabase);
  const [selectedClassAttendance, setSelectedClassAttendance] = useState([]);
  const [selectedHour, setSelectedHour] = useState(1);

  const handleAttendanceChange = (studentId) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId ? { ...student, isPresent: !student.isPresent } : student
      )
    );
  };

  const getAttendanceText = (isPresent) => {
    return isPresent ? 'Present' : 'Absent';
  };

  const generateClassAttendanceData = () => {
    const classAttendance = [];

    const selectedClassStudents = attendanceData.filter(
      (student) => student.department === selectedDepartment && student.year === selectedYear
    );

    const totalStudents = selectedClassStudents.length;
    const presentStudents = selectedClassStudents.filter((student) => student.isPresent).length;
    const attendancePercentage = (presentStudents / totalStudents) * 100;

    classAttendance.push({
      name: `${selectedDepartment} - ${selectedYear}`,
      attendancePercentage,
    });

    setSelectedClassAttendance(classAttendance);
    alert("Attendence Marked!")
    
  };

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
          <option value="ECE A">ECE A</option>
          <option value="ECE B">ECE B</option>
          <option value="EEE A">EEE A</option>
          <option value="EEE B">EEE B</option>
          <option value="IT A">IT A</option>
          <option value="IT B">IT B</option>
          <option value="CSE A">CSE A</option>
          <option value="CSE B">CSE B</option>
          <option value="CSE C">CSE C</option>
        </select>
      </div>

      <div>
        <label>Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="Year I">Select Year </option>
          <option value="Year I">Year I</option>
          <option value="Year II">Year II</option>
          <option value="Year III">Year III</option>
          <option value="Year IV">Year IV</option>
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
          {attendanceData
            .filter(
              (student) =>
                student.department === selectedDepartment && student.year === selectedYear
            )
            .map((student) => (
              <tr key={student.id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.contact}</td>
                <td>
                  <span
                    onClick={() => {
                      handleAttendanceChange(student.id);
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
              dataKey="Attendence  Percentage"
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