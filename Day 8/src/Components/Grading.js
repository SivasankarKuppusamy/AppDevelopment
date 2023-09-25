import React, { useState, useEffect } from 'react';
import './Grading.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { CSVLink } from 'react-csv';

const students = [
  {
    id: 1,
    name: 'Student 1',
    department: 'Computer Science',
    year: 'Senior',
    courses: ['Course A', 'Course B', 'Course C'],
    grades: [
      { courseId: 1, courseName: 'Course A', cia1: '', cia2: '', theory: '', grade: '' },
      { courseId: 2, courseName: 'Course B', cia1: '', cia2: '', theory: '', grade: '' },
      { courseId: 3, courseName: 'Course C', cia1: '', cia2: '', theory: '', grade: '' },
    ],
  },
  {
    id: 2,
    name: 'Student 2',
    department: 'Electrical Engineering',
    year: 'Junior',
    courses: ['Course X', 'Course Y'],
    grades: [
      { courseId: 4, courseName: 'Course X', cia1: '', cia2: '', theory: '', grade: '' },
      { courseId: 5, courseName: 'Course Y', cia1: '', cia2: '', theory: '', grade: '' },
    ],
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function Grading() {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [gradingCourse, setGradingCourse] = useState(null);
  const [grades, setGrades] = useState({ cia1: '', cia2: '', theory: '' });
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [studentDetails, setStudentDetails] = useState([...students]);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

  useEffect(() => {
   
    calculateGrades();
  }, [studentDetails]);

  useEffect(() => {

    const selected = studentDetails.find((student) => student.id === Number(selectedStudent));
    setSelectedStudentDetails(selected);
  }, [selectedStudent, studentDetails]);

  const calculateGrades = () => {
    const updatedStudentDetails = studentDetails.map((student) => {
      return {
        ...student,
        grades: student.grades.map((gradeInfo) => {
          const cia1 = parseFloat(gradeInfo.cia1);
          const cia2 = parseFloat(gradeInfo.cia2);
          const theory = parseFloat(gradeInfo.theory);

          if (!isNaN(cia1) && !isNaN(cia2) && !isNaN(theory)) {
            const totalMarks = cia1 + cia2 + theory;
            let grade = '';

            if (totalMarks >= 90) {
              grade = 'A+';
            } else if (totalMarks >= 80) {
              grade = 'A';
            } else if (totalMarks >= 70) {
              grade = 'B';
            } else if (totalMarks >= 60) {
              grade = 'C';
            } else if (totalMarks >= 50) {
              grade = 'D';
            } else {
              grade = 'F';
            }

            return { ...gradeInfo, grade };
          }

          return gradeInfo;
        }),
      };
    });

    setStudentDetails(updatedStudentDetails);
  };

  const handleStudentChange = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    const selectedStudent = students.find((student) => student.id === Number(studentId));
    setSelectedCourses(selectedStudent ? selectedStudent.courses : []);
  };

  const handleCourseGrade = (course) => {
    setGradingCourse(course);
    setGrades({ cia1: '', cia2: '', theory: '' });
  };

  const handleSubmitGrade = () => {
    const updatedStudentDetails = studentDetails.map((student) => {
      if (student.id === Number(selectedStudent)) {
        return {
          ...student,
          grades: student.grades.map((gradeInfo) => {
            if (gradeInfo.courseName === gradingCourse) {
              return { ...gradeInfo, ...grades };
            }
            return gradeInfo;
          }),
        };
      }
      return student;
    });

    setStudentDetails(updatedStudentDetails);

    setGradingCourse(null);
    setGrades({ cia1: '', cia2: '', theory: '' });
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleFetchStudentData = () => {
    const student = studentDetails.find((student) => student.id === Number(studentId));
    if (student) {
      setStudentData(student.grades);
    }
  };

  const handleEditGrade = (studentId, courseId, newGrade) => {
    const updatedStudentDetails = studentDetails.map((student) => {
      if (student.id === studentId) {
        const updatedGrades = student.grades.map((gradeInfo) => {
          if (gradeInfo.courseId === courseId) {
            return { ...gradeInfo, ...grades };
          }
          return gradeInfo;
        });
        return { ...student, grades: updatedGrades };
      }
      return student;
    });
    setStudentDetails(updatedStudentDetails);
  };

  return (
    <div className="course-grading">
      <h2>Course Grading</h2>

      <div className="student-select">
        <label>Select Student:</label>
        <select onChange={handleStudentChange} value={selectedStudent}>
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      {selectedStudentDetails && (
        <div className="student-details">
          <h2>Student Details</h2>
          <p>
            <strong>Student ID:</strong> {selectedStudentDetails.id}
          </p>
          <p>
            <strong>Student Name:</strong> {selectedStudentDetails.name}
          </p>
          <p>
            <strong>Department:</strong> {selectedStudentDetails.department}
          </p>
          <p>
            <strong>Year:</strong> {selectedStudentDetails.year}
          </p>
        </div>
      )}
      <div className="course-list">
        <h3>Selected Courses for Grading:</h3>
        <ul>
          {selectedCourses.map((course) => (
            <li key={course}>
              {course}{' '}
              <button class="grade-btn" onClick={() => handleCourseGrade(course)}>Grade</button>
            </li>
          ))}
        </ul>
      </div>
      {gradingCourse && (
        <div className="popup">
          <h3>Grade Course: {gradingCourse}</h3>
          <label>CIA 1:</label>
          <input
            type="text"
            value={grades.cia1}
            onChange={(e) => setGrades({ ...grades, cia1: e.target.value })}
          />
          <label>CIA 2:</label>
          <input
            type="text"
            value={grades.cia2}
            onChange={(e) => setGrades({ ...grades, cia2: e.target.value })}
          />
          <label>Theory:</label>
          <input
            type="text"
            value={grades.theory}
            onChange={(e) => setGrades({ ...grades, theory: e.target.value })}
          />
          <button onClick={handleSubmitGrade}>Submit Grade</button>
          <button className="cancel-btn" onClick={() => setGradingCourse(null)}>
            Close
          </button>
        </div>
      )}

      <div className="student-details">
        <h2>Student Details</h2>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>CIA 1</th>
              <th>CIA 2</th>
              <th>Theory</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedStudentDetails &&
              selectedStudentDetails.grades.map((gradeInfo, index) => (
                <tr key={index}>
                  <td>{selectedStudentDetails.id}</td>
                  <td>{selectedStudentDetails.name}</td>
                  <td>{gradeInfo.courseName}</td>
                  <td>
                    <input
                      type="text"
                      value={gradeInfo.cia1}
                      onChange={(e) =>
                        handleEditGrade(selectedStudentDetails.id, gradeInfo.courseId, { ...grades, cia1: e.target.value })
                      }
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={gradeInfo.cia2}
                      onChange={(e) =>
                        handleEditGrade(selectedStudentDetails.id, gradeInfo.courseId, { ...grades, cia2: e.target.value })
                      }
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={gradeInfo.theory}
                      onChange={(e) =>
                        handleEditGrade(selectedStudentDetails.id, gradeInfo.courseId, { ...grades, theory: e.target.value })
                      }
                      disabled
                    />
                  </td>
                  <td>{gradeInfo.grade}</td>
                  <td>
                    <button onClick={() => handleEditGrade(selectedStudentDetails.id, gradeInfo.courseId, '')}>
                      Clear
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="download-button">
        <CSVLink
          data={studentDetails}
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
