import React, { useState, useEffect } from 'react';
import './InstructorDashboard.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { getCourseData } from './CourseData';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip as RechartsTooltip } from 'recharts';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function InstructorDashboard() {
  const username = useSelector((state) => state.user.user);
  const userType = useSelector((state) => state.user.userType);
  const [courses, setCourses] = useState([
    {
        id: 1,
        name: "John Doe",
        department: "Computer Science",
        year: "Junior",
        attendance: 85,
        profileImage: "https://example.com/john-doe-profile.jpg",
        enrolledCourses: [
          {
            courseId: 101,
            courseName: "Introduction to Programming",
            instructor: "Prof. Smith",
            grade: "A",
          },
          {
            courseId: 102,
            courseName: "Web Development Fundamentals",
            instructor: "Dr. Johnson",
            grade: "A-",
          },
        ],
      },
      {
        id: 2,
        name: "Jane Smith",
        department: "Electrical Engineering",
        year: "Sophomore",
        attendance: 92,
        profileImage: "https://example.com/jane-smith-profile.jpg",
        enrolledCourses: [
          {
            courseId: 103,
            courseName: "Digital Circuits",
            instructor: "Prof. Davis",
            grade: "B+",
          },
        ],
      },
      {
        id: 3,
        name: "Michael Johnson",
        department: "Mechanical Engineering",
        year: "Senior",
        attendance: 78,
        profileImage: "https://example.com/michael-johnson-profile.jpg",
        enrolledCourses: [
          {
            courseId: 104,
            courseName: "Thermodynamics",
            instructor: "Dr. Wilson",
            grade: "A",
          },
          {
            courseId: 105,
            courseName: "Mechanical Design",
            instructor: "Prof. Brown",
            grade: "A-",
          },
        ],
      },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);
const studentData=useState([]);
const [coursesr, setCoursesr] = useState([
  {
    id: 1,
    title: 'Course 1',
    students: 30,
    stars5: 5,
    stars4: 8,
    stars3: 7,
  },
  {
    id: 2,
    title: 'Course 2',
    students: 25,
    stars5: 8,
    stars4: 6,
    stars3: 5,
  },
]);
useEffect(() => {
  const courseData = getCourseData();
  setCourses(courseData);
}, []);

  const tableData = coursesr.map((course) => ({
    name: course.title,
    students: course.students,
    stars5: course.stars5,
    stars4: course.stars4,
    stars3: course.stars3,
  }));

  const pieChartData = [
    { name: '5 Stars', value: tableData.reduce((total, course) => total + course.stars5, 0) },
    { name: '4 Stars', value: tableData.reduce((total, course) => total + course.stars4, 0) },
    { name: '3 Stars', value: tableData.reduce((total, course) => total + course.stars3, 0) },
  ];

  const barChartData = tableData.map((course) => ({
    name: course.name,
    students: course.students,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={-10} textAnchor={textAnchor} fill="#333">
          {`Students: ${payload.value}`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div id="instructor-dashboard">
      <div className="overview">
        <h2>Overview</h2>
      </div>

      <div className="overview-container">
        <div className="overview-item">
          <img
            className="student-image"
            src="https://clipart-library.com/images_k/graduate-silhouette-vector/graduate-silhouette-vector-21.png"
            alt="Certifications Received"
          />
          <h5>Certifications Taught</h5>
          <h6>{tableData.length}</h6>
        </div>

        <div className="overview-item">
          <img
            className="student-image"
            src="https://www.pngarts.com/files/7/School-Education-Course-PNG-Photo.png"
            alt="Total Courses Taught"
          />
          <h5>Total Courses Taught</h5>
          <h6>{tableData.length}</h6>
        </div>

        <div className="overview-item">
          <img
            className="student-image"
            src="https://cdn-icons-png.flaticon.com/512/8999/8999099.png"
            alt="Average Rating"
          />
          <h5>Average Rating</h5>
          <h6>
            
              6
          </h6>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="courses-section">
          <h2>Ongoing Courses</h2>
          <table className="courses-table">
            <thead>
              <tr>
                <th>COURSE TITLE</th>
                <th>STATUS</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>Ongoing</td>
                  <td>
                    <VisibilityIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="performance-section">
          <h2>Course Enrollment</h2>
          <BarChart width={400} height={200} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>

          <div style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Course Ratings
            </Typography>
            <ResponsiveContainer width={400} height={200}>
              <PieChart width={400} height={200}>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  onMouseEnter={onPieEnter}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
</div>

    </div>
  );
}

export default InstructorDashboard;
