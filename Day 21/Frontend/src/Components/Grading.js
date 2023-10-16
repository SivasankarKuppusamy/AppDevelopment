import React, { useState, useEffect } from 'react';
import './Grading.css';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DeleteOutline } from '@mui/icons-material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function Grading() {
  const [departments, setDepartments] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedDepartment, setselectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [EnrolledCourses, setEnrolledCourses] = useState([]);
  const [studentId, setStudentId] = useState('');

  const fetchStudents = () => {
    console.log('Selected Department:', selectedDepartment);
    console.log('Selected Year:', selectedYear);
    if (selectedDepartment && selectedYear) {
      axios
        .get(`http://localhost:8080/students/department/${selectedDepartment}/year/${selectedYear}`)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const fetchEnrolledCourses = (studentId) => {
    setStudentId(studentId);
    console.log(studentId);
    if (studentId) {
      axios
        .get(`http://localhost:8080/students/enrollments/students/${studentId}`)
        .then((response) => {
          console.log(response.data);
          setEnrolledCourses(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetchStudents();
    axios
      .get("http://localhost:8080/students/unique/departments")
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const nav = useNavigate();
  const token = localStorage.getItem("jwtToken");
  if (token === null) {
    nav("/login");
  }

  const [courseId, setCourseId] = useState('');

  const [gradingCourse, setGradingCourse] = useState(null);
  const [studentDetails, setStudentDetails] = useState([]);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);
  const [isGradingPopupVisible, setIsGradingPopupVisible] = useState(false);
  const [gradingData, setGradingData] = useState({
   
    cia1: 0,
    cia2: 0,
    final_mark: 0,
    lab: 0,
    component: 0,
    total: 0,
  });

  const openGradingPopup = (courseId) => {
    console.log(studentId);
    setCourseId(courseId);
    setIsGradingPopupVisible(true);
  };

  const closeGradingPopup = () => {
    setIsGradingPopupVisible(false);
  };

  const handleGradingChange = (e) => {
    const { name, value } = e.target;
    setGradingData({ ...gradingData, [name]: parseFloat(value) || 0 });
  };

  const [studentGrades, setStudentGrades] = useState([]);
  const fetchStudentGrades = () => {
    if (studentId && courseId) {
      axios
        .get(`http://localhost:8080/grades/${studentId}/${courseId}`)
        .then((response) => {
          setStudentGrades(response.data);
          setGradingData(response.data)
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    fetchStudentGrades();
  }, [studentId, courseId]);

  const saveGradingData = () => {
    axios
      .post("http://localhost:8080/grades", {
        studentId: studentId,
        courseId: courseId,
        cia1: gradingData.cia1,
        cia2: gradingData.cia2,
        final_mark: gradingData.final_mark,
        lab: gradingData.lab,
        component: gradingData.component,
        total: gradingData.total,
      })
      .then((response) => {
        alert("Student Graded..");
        fetchStudentGrades();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const total =
      gradingData.cia1 + gradingData.cia2 + gradingData.final_mark + gradingData.lab + gradingData.component;
    setGradingData({ ...gradingData, total });
  }, [gradingData]);

  const [courseMarks, setCourseMarks] = useState([]);

  const fetchCourseMarks = (tempcourseId) => {
    if (tempcourseId) {
      axios
        .get(`http://localhost:8080/grades/course/${tempcourseId}`)
        .then((response) => {
          setCourseMarks(response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="course-grading">
      <h2>Course Grading</h2>

      <div className="student-select">
        <label>Select Department:</label>
        <select onChange={(e) => setselectedDepartment(e.target.value)} value={selectedDepartment}>
          <option value="">-- Select Department --</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Year:</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div class="btn">
        <button onClick={fetchStudents}>Fetch</button>
      </div>
      {students != null ? (
        <div>
          <div className="student-select">
            <label>Select Student:</label>
          </div>
          <table className="grade-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
                  <td>
                    <button className="grade-btn" onClick={() => fetchEnrolledCourses(student.studentId)}>
                      Get Courses
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <h2>Enrolled Courses</h2>
      {Object.values(EnrolledCourses).map((course) => (
        <table className="grade-table" key={course.enrollmentId}>
          <tr>
            <td>{course.id}</td>
            <td>{course.title}</td>
            <td>{course.instructor}</td>
            <td>
              <button className="grade-btn" onClick={() => openGradingPopup(course.id)}>
                Grade
              </button>
            </td>
          </tr>
        </table>
      ))}

      {isGradingPopupVisible ? (
        <div className="grading-popup">
          <h2>Grade Student</h2>
          <label>CIA 1:</label>
          <input type="number" name="cia1" value={gradingData.cia1} onChange={handleGradingChange} />
          <label>CIA 2:</label>
          <input type="number" name="cia2" value={gradingData.cia2} onChange={handleGradingChange} />
          <label>Final:</label>
          <input type="number" name="final_mark" value={gradingData.final_mark} onChange={handleGradingChange} />
          <label>Lab:</label>
          <input type="number" name="lab" value={gradingData.lab} onChange={handleGradingChange} />
          <label>Component:</label>
          <input type="number" name="component" value={gradingData.component} onChange={handleGradingChange} />
          <label>Total:</label>
          <input type="number" disabled value={gradingData.total} />
          <button className="cancel-btn" onClick={saveGradingData}>
            Submit
          </button>
          <button className="cancel-btn" onClick={closeGradingPopup}>
            Cancel
          </button>
        </div>
      ) : null}

      {studentGrades !== null ? (
        <div className="student-details">
          <h2>Student Details</h2>
          <table>
            <thead>
              <tr>
                <th>Course Id</th>
                <th>CIA 1</th>
                <th>CIA 2</th>
                <th>Final</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{studentGrades.studentId}</td>
                <td>{studentGrades.cia1}</td>
                <td>{studentGrades.cia2}</td>
                <td>{studentGrades.final_mark}</td>
                <td>{studentGrades.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="download-button">
        <CSVLink
          data={courseMarks}
          filename={'student_grades.csv'}
          className="btn btn-primary"
          target="_blank"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default Grading;
