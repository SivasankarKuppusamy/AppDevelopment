import React, { useState, useEffect } from 'react';
import './Students.css';
import EnrollmentPopup from './EnrollmentPopup'; // Import the EnrollmentPopup component
import { getCourseData } from './CourseData';

function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '',
    studentId: '',
    dept: '',
    quota: '',
    contactnum: '',
    address: '',
    avggrade: '',
  });
  const [studentsData, setStudentsData] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [selectedGender, setSelectedGender] = useState('Male'); // Default to 'Male'
  const [enrollmentPopupOpen, setEnrollmentPopupOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [courses, setCourses] = useState(getCourseData()); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setEditMode(false);
    setFormErrors({});
    setNewStudent({
      name: '',
      studentId: '',
      dept: '',
      quota: '',
      contactnum: '',
      address: '',
      avggrade: '',
    });
  };

  const handleFieldChange = (field, value) => {
    setFormErrors({ ...formErrors, [field]: '' });
    setNewStudent({ ...newStudent, [field]: value });
  };

  const addStudent = () => {
    const errors = validateForm(newStudent);
    if (Object.keys(errors).length === 0) {
      const updatedStudents = [
        ...studentsData,
        {
          ...newStudent,
          id: studentsData.length + 1,
          imageUrl:
            selectedGender === 'Male'
              ? 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'
              : 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png',
        },
      ];
      // Update studentsData state first
      setStudentsData(updatedStudents);
      // Update local storage
      localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
      setIsOpen(false);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (student) => {
    const errors = {};

    if (!student.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!student.studentId.trim()) {
      errors.studentId = 'Student ID is required';
    }

    if (!student.dept.trim()) {
      errors.dept = 'Student Department is required';
    }

    if (!student.quota.trim()) {
      errors.quota = 'Student Quota is required';
    }

    if (!student.contactnum.trim()) {
      errors.contactnum = 'Student Contact Number is required';
    }

    if (!student.address.trim()) {
      errors.address = 'Student Address is required';
    }

    return errors;
  };

  const editStudent = (studentId) => {
    const studentToEdit = studentsData.find((student) => student.id === studentId);
    if (studentToEdit) {
      setEditMode(true);
      setEditStudentId(studentId);
      setNewStudent({ ...studentToEdit });
      setIsOpen(true);
    }
  };

  const updateStudent = () => {
    const errors = validateForm(newStudent);
    if (Object.keys(errors).length === 0) {
      const updatedStudents = studentsData.map((student) =>
        student.id === editStudentId ? { ...newStudent, id: editStudentId } : student
      );
      setStudentsData(updatedStudents);
      localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
      setIsOpen(false);
      setEditMode(false);
    } else {
      setFormErrors(errors);
    }
  };

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      const updatedStudents = studentsData.filter((student) => student.id !== studentId);
      setStudentsData(updatedStudents);
      localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
    }
  };

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('studentsData')) || [];
    setStudentsData(storedStudents);
  }, []);
  const handleEnrollmentClick = (studentId) => {
    setSelectedStudentId(studentId);
    setEnrollmentPopupOpen(true);
  };
  const handleEnroll = (courseId) => {
    const selectedStudent = studentsData.find((student) => student.id === selectedStudentId);
    if (selectedStudent) {
      const selectedCourse = courses.find((course) => course.id === courseId);
      if (selectedCourse) {
        if (selectedCourse.enrolledStudents.some((student) => student.id === selectedStudentId)) {
          alert('Error: Student is already enrolled in this course.');
        } else {
          const updatedCourses = courses.map((course) => {
            if (course.id === selectedCourse.id) {
              return {
                ...course,
                enrolledStudents: [...course.enrolledStudents, selectedStudent],
              };
            }
            return course;
          });
          setCourses(updatedCourses);
          localStorage.setItem('courses', JSON.stringify(updatedCourses));
          setEnrollmentPopupOpen(false);
        }
      }
    }
  };
  
  return (
    <div className="students-container">
      <div className="header">
        <h1>STUDENT DETAILS</h1>
        <input
          className="search-field"
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="add-student-button" onClick={togglePopup}>
          Add Student
        </button>
      </div>
      {filteredStudents.map((student) => (
        <div className="student-box" key={student.id}>
          <div className="student-image">
            <img src={student.imageUrl} alt={student.name} />
          </div>
          <div className="student-details">
            <div className="student-info">
              <p className="student-name">{student.name}</p>
              <p className="student-id">ID: {student.studentId}</p>
            </div>
            <div className="detail-box">
              <div className="detail">
                <strong>Department:</strong> {student.dept}
              </div>
              <div className="detail">
                <strong>Quota:</strong> {student.quota}
              </div>
              <div className="detail">
                <strong>Contact:</strong> {student.contactnum}
              </div>
              <div className="detail">
                <strong>Address:</strong> {student.address}
              </div>
              <div className="detail">
                <strong>AvgGrade:</strong> {student.avggrade}
              </div>
              <div className="button-container">
                <button className="student-button edit" onClick={() => editStudent(student.id)}>
                  Edit
                </button>
                <button className="student-button delete" onClick={() => deleteStudent(student.id)}>
                  Delete
                </button>
                <button className="student-button enroll" onClick={() => handleEnrollmentClick(student.id)}>
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpen && (
        <div className="popup">
          <h3>{editMode ? 'EDIT STUDENT' : 'ADD A STUDENT'}</h3>
          <input
            type="text"
            className="student-name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
          <input
            type="text"
            className="student-id"
            placeholder="Student ID"
            value={newStudent.studentId}
            onChange={(e) => handleFieldChange('studentId', e.target.value)}
          />
          {formErrors.studentId && <p className="error">{formErrors.studentId}</p>}
          <div class="gender-div">
          Gender : &nbsp;<select
            className="student-gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
            </div>

          <input
            type="text"
            className="student-dept"
            placeholder="Department"
            value={newStudent.dept}
            onChange={(e) => handleFieldChange('dept', e.target.value)}
          />
          {formErrors.dept && <p className="error">{formErrors.dept}</p>}

          <input
            type="text"
            className="student-quota"
            placeholder="Quota"
            value={newStudent.quota}
            onChange={(e) => handleFieldChange('quota', e.target.value)}
          />
          {formErrors.quota && <p className="error">{formErrors.quota}</p>}

          <input
            type="text"
            className="student-contactnum"
            placeholder="Contact Number"
            value={newStudent.contactnum}
            onChange={(e) => handleFieldChange('contactnum', e.target.value)}
          />
          {formErrors.contactnum && <p className="error">{formErrors.contactnum}</p>}

          <input
            type="text"
            className="student-address"
            placeholder="Address"
            value={newStudent.address}
            onChange={(e) => handleFieldChange('address', e.target.value)}
          />
          {formErrors.address && <p className="error">{formErrors.address}</p>}

          {editMode ? (
            <button className="submit-student" onClick={updateStudent}>
              UPDATE
            </button>
          ) : (
            <button className="submit-student" onClick={addStudent}>
              ADD
            </button>
          )}
          <button className="cancel-btn" onClick={togglePopup}>
            Cancel
          </button>
        </div>
      )}
      {enrollmentPopupOpen && (
        <EnrollmentPopup 
          courses={courses}
          onEnroll={handleEnroll}
          selectedStudentId={selectedStudentId}
          onClose={() => setEnrollmentPopupOpen(false)}
          setEnrollmentPopupOpen={setEnrollmentPopupOpen}
        />
      )}
    </div>
  );
}

export default Students;
