import React, { useState, useEffect } from 'react';
import './Admin.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineChartTooltip,
  Legend as LineChartLegend,
} from 'recharts';
import { Link } from 'react-router-dom';


function AdminDashboard() {
  const pieChartData = [
    { name: 'A', value: 10 },
    { name: 'B', value: 15 },
    { name: 'C', value: 20 },
  ];
  const lineChartData = [
    { name: '1', value: 2 },
    { name: '2', value: 5.5 },
    { name: '3', value: 2 },
    { name: '4', value: 8.5 },
    { name: '5', value: 1.5 },
    { name: '6', value: 5 },
  ];

  
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('studentsData')) || [];
    setStudents(storedStudents);
  }, []);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const faculties = [
    { id: 1, name: 'Mr. K. Siva', department: 'Computer Science' },
    { id: 2, name: 'Ms. A. Smith', department: 'Electrical Engineering' },
  ];

  return (
    <div id="main">
      <div class="over">
        <div id="det">
          <h2>OVERVIEW</h2>
        </div>
        <div id="overview">
        <Link to="/students"><div className="one">
        <img id="student-image" src="https://clipart-library.com/images_k/graduate-silhouette-vector/graduate-silhouette-vector-21.png"/>
        <h5>Total number Students</h5>
        <h6>100</h6>
        </div>  </Link>
        <Link to="/courses"> <div className="one">
        <img id="student-image" src="https://www.pngarts.com/files/7/School-Education-Course-PNG-Photo.png"/>
        <h5>Courses Offered</h5>
        <h6>27</h6>
        </div>   </Link>
        <div className="one">
        <img id="student-image" src="https://w7.pngwing.com/pngs/879/904/png-transparent-subject-international-english-computer-icons-symbol-english-miscellaneous-blue-english-thumbnail.png" />
        <h5>Subjects Available</h5>
        <h6>75</h6>
        </div>
       <a href="#insa"> <div className="one">
        <img id="student-image" src="https://p7.hiclipart.com/preview/396/474/550/teacher-education-school-classroom-computer-icons-teacher.jpg"/>
        <h5>Total number of Instructors</h5>
        <h6>100 </h6>
        </div></a>
        </div>
      </div>

      <div id="div2">

      
      </div>
      <div class="heads">
        <h2 class="head1">Students List</h2>
      
        </div>
<div class="row1">
      <div id="students-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.dept}</td>
                <td>{student.contactnum}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pie-chart">
        &nbsp;&nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;PIECHART REPRESENTATION
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={pieChartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>
      </div>
      <h2 id="det another">STUDENTS ENROLLMENT AND COURSES OVERVIEW</h2>
<div class="row2">
<div className="line">
  
        <LineChart width={500} height={300} data={lineChartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <LineChartTooltip />
          <LineChartLegend />
        </LineChart>
      </div>
        <h2 id="insa" class="fac-head">Faculties List</h2><br/>
      <div id="faculties-list">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((faculty) => (
              <tr key={faculty.id}>
                <td>{faculty.id}</td>
                <td>{faculty.name}</td>
                <td>{faculty.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
