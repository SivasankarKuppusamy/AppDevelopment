import React, { useState, useEffect } from 'react';
import './Students.css';
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
  removeItemFromLocalStorage,
} from './LocalStorage';

function EnrollmentPopup({
  courses,
  studentsData,
  selectedStudentId,
  onEnroll,
  onClose,
  setEnrollmentPopupOpen,
}) {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [initialEnrolledCourses, setInitialEnrolledCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    setInitialEnrolledCourses(getItemFromLocalStorage('enrolledCourses') || []);
    console.log(initialEnrolledCourses)
  }, []);

  const handleEnroll = () => {
    const selectedCourseObject = courses.find((course) => course.title === courseTitle);

    if (selectedCourseObject) {
      selectedCourseObject.enrolledStudents = selectedCourseObject.enrolledStudents || [];

      const alreadyEnrolledStudent = selectedCourseObject.enrolledStudents.find(
        (student) => student.id === selectedStudentId
      );

      if (alreadyEnrolledStudent) {
        alert('Error: Student is already enrolled in this course.');
      } else {
        const updatedCourses = courses.map((course) => {
          if (course.title === selectedCourseObject.title) {
            return {
              ...course,
              enrolledStudents: [...(course.enrolledStudents || []), selectedStudentId],
            };
          }
          return course;
        });

        onEnroll(updatedCourses);
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        setEnrollmentPopupOpen(false);
      }
    }
  };

  const clearEnrolledCourses = () => {
    removeItemFromLocalStorage('enrolledCourses');
  };

  return (
    <div className="enrollment-popup">
      <h3>Enroll Student in a Course</h3>
      <select
        className="course-select"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      >
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.title}>
            {course.title}
          </option>
        ))}
      </select>
      <button onClick={handleEnroll}>Enroll</button>
      <button className="cancel-btn" onClick={onClose}>
        Cancel
      </button>
      <button className="cancel-btn" onClick={clearEnrolledCourses}>
        Clear Enrolled Courses
      </button>
    </div>
  );
}

export default EnrollmentPopup;
