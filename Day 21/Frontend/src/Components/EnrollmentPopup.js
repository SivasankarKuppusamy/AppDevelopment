import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import "./popup.css"
function EnrollmentPopup({
  onEnroll,
  selectedStudentId,
  onClose,
}) {
  const [courseId, setCourseId] = useState(''); 
  const [courses,setCourses]=useState([])
  const [studentId, setStudentId] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const fetchEnrolledCourses=()=>{

    axios.get(`http://localhost:8080/students/enrollments/students/${selectedStudentId}`).then((response)=>{
      setEnrolledCourses(response.data)
      console.log(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }
useEffect(()=>{
  fetchEnrolledCourses();
 
  axios.get("http://localhost:8080/courses").then((response)=>{
      setCourses(response.data)
  }).catch((error)=>{
    console.log(error)
  })
},[])
  const handleEnroll = () => {
    
    if (courseId && selectedStudentId) {
        axios.post('http://localhost:8080/students/enroll', {
          courseId:courseId,
          studentId: selectedStudentId,
        })
          .then((response) => {
            console.log(response)
  fetchEnrolledCourses();

            alert("Student Enrolled successfully...")
          })
          .catch((error) => {
            alert("Student Already Enrolled .....")
            console.error('Error enrolling student:', error);
          });
     
    }
  };
  const deleteEnrollment=(enrollmentId)=>{
    if(enrollmentId&&window.confirm('Are you Sure')){
      axios.delete(`http://localhost:8080/students/deleteEnroll/${enrollmentId}`).then((response)=>{
        console.log(response)
        fetchEnrolledCourses();
      }).catch(error=>{
        console.log(error)
      })
    }
  }

  return (
    <div className="enrollment-popup">
      <h3>Enroll Student in a Course</h3>
      <select
        className="course-select"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      >
        <option value="">Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>{course.title}</option>
        ))}
      </select>
      <button onClick={handleEnroll}>Enroll</button>
      <h4>Enrolled Courses:</h4>
      <table className='table-elements'>
        {enrolledCourses.map((courses) => (
          <tr class="list-elements" key={courses.courseId}>
            <td>
              {courses.id}</td>
              <td>{courses.title}</td>
              <td>{courses.instructor}</td>
              <td><ClearIcon onClick={()=>deleteEnrollment(courses.enrollmentId)}/></td>
              </tr>
        ))}
      </table>
      <button className="cancel-btn" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

export default EnrollmentPopup;
