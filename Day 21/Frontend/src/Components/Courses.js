import React, { useState, useEffect } from 'react';
import './Courses.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCourseData, setCourseData } from './CourseData'; 
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Courses() {
  const [isOpen, setIsOpen] = useState(false);
  const [courseData, setCourseDataState] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null); 
  const userType = localStorage.getItem("role")
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    imageSrc: '',
    instructor: '',
  });
  const nav=useNavigate();
  const token=localStorage.getItem("jwtToken")
  if(token===null){
    nav("/login")
    
  }
  useEffect(() => {
   
    setCourseData(courseData);
  }, [courseData]);

  const togglePopup = (course = null) => {
    if (course) {
      setEditingCourse(course);
    } else {
      setEditingCourse(null);
    }
    setFormErrors({
      title: '',
      description: '',
      imageSrc: '',
      instructor: '',
    });
    setIsOpen(!isOpen);
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!data.description.trim()) {
      errors.description = 'Description is required';
    } else {
      errors.description = '';
    }

    if (!data.imageSrc.trim()) {
      errors.imageSrc = 'Image URL is required';
    } else {
      errors.imageSrc = '';
    }

    if (!data.instructor.trim()) {
      errors.instructor = 'Instructor name is required';
    } else {
      errors.instructor = '';
    }

    return errors;
  };

  const handleFieldChange = (field, value) => {
    setFormErrors({ ...formErrors, [field]: '' });
  };


  const addOrUpdateCourse = async (newCourse) => {
    const errors = validateForm(newCourse);
    if (Object.keys(errors).some((key) => errors[key])) {
      setFormErrors(errors);
      return;
    }
  
    if (editingCourse) {
      try {
        
        await axios.put(`http://localhost:8080/courses/${editingCourse.id}`, newCourse,{headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
        }});
        const updatedData = courseData.map((course) =>
          course.id === editingCourse.id ? newCourse : course
        );
        setCourseDataState(updatedData);
      } catch (error) {
        console.error('Error updating course:', error);
      }
    } else {
      try {
        console.log(token)
        const response = await axios.post('http://localhost:8080/courses', newCourse,{headers:{
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', 
      }}); 
        const newCourseWithId = response.data;
        setCourseDataState([...courseData, newCourseWithId]);
      } catch (error) {
        console.error('Error creating course:', error);
      }
    }
  
    setIsOpen(false);
  };
  
useEffect(()=>{
axios.get("http://localhost:8080/courses",{headers:{
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json', 
}}).then((response)=>{
  setCourseDataState(response.data)
}).catch(error=>{
  console.log(error)
})
},[])
  
  const deleteCourse = (courseId) => {
    if (window.confirm("Are you sure?")) {
       axios.delete(`http://localhost:8080/courses/${courseId}`,{headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', 
        }});
    window.location.reload();
      }
  };

  return (
    <div className="courses">
      <div className="head">
        <h2>COURSES LIST</h2>
        {userType === 'ADMIN' && (
          <>
            <button onClick={() => togglePopup()} className="add-btn">
              ADD COURSE
            </button>
            {isOpen && (
              <div className="popup">
                <h3>{editingCourse ? 'EDIT A COURSE' : 'ADD A COURSE'}</h3>
                <input
                  type="text"
                  className="course-title"
                  placeholder="Course Title"
                  defaultValue={editingCourse ? editingCourse.title : ''}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                />
                {formErrors.title && <p className="error">{formErrors.title}</p>}
                <input
                  type="text"
                  className="course-desc"
                  placeholder="Course Description"
                  defaultValue={editingCourse ? editingCourse.description : ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                />
                {formErrors.description && <p className="error">{formErrors.description}</p>}
                <input
                  type="text"
                  className="course-url"
                  placeholder="Course Thumbnail URL"
                  defaultValue={editingCourse ? editingCourse.imageSrc : ''}
                  onChange={(e) => handleFieldChange('imageSrc', e.target.value)}
                />
                {formErrors.imageSrc && <p className="error">{formErrors.imageSrc}</p>}
                <input
                  type="text"
                  className="course-ins"
                  placeholder="Course Instructor Name"
                  defaultValue={editingCourse ? editingCourse.instructor : ''}
                  onChange={(e) => handleFieldChange('instructor', e.target.value)}
                />
                {formErrors.instructor && <p className="error">{formErrors.instructor}</p>}
                <button className="submit-course" onClick={() => addOrUpdateCourse({
                  title: document.querySelector('.course-title').value,
                  description: document.querySelector('.course-desc').value,
                  imageSrc: document.querySelector('.course-url').value,
                  instructor: document.querySelector('.course-ins').value,
                })}>
                  {editingCourse ? 'UPDATE' : 'ADD'}
                </button>
                <button className="cancel-btn" onClick={() => togglePopup()}>Cancel</button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="course-list">
        {courseData.map((course) => (
          <div className="course-item" key={course.id}>
            <img src={course.imageSrc} alt={course.title} className="course-image" />
            <h4 className="course-title">{course.title}</h4>
            <p className="course-description">{course.description}</p>
            <p className="course-instructor">Instructor: {course.instructor}</p>
            {userType === 'ADMIN' && (
              <>
                <button className="edit" onClick={() => togglePopup(course)}>
                  EDIT
                </button>
                <button className="delete-btn" onClick={() => deleteCourse(course.id)}>
                  DELETE
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
