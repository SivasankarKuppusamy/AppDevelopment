import React, { useState, useEffect } from 'react';
import './Students.css';
import EnrollmentPopup from './EnrollmentPopup'; // Import the EnrollmentPopup component
import { getCourseData } from './CourseData';
import axios from 'axios';
import StudentData from './StudentData';
import { getToken } from './LocalStorage';
import { useNavigate } from 'react-router-dom';

function Students() {
  const [selectedGender, setSelectedGender] = useState('Male'); 
  const [searchQuery, setSearchQuery] = useState('');
  const nav=useNavigate();
  const token=getToken();
  if(token===null){
    nav("/login")
  }
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const password="defaultpassword"

  const [newStudent, setNewStudent] = useState({
    studentName: '',
    email:'',
    gender:'Male',
    year:'',
    dept: '',
    quota: '',
    contactnum: '',
    address: '',
    age:'',
    dob:'',
    totalFees:'',
    feesPaid:'',
    avggrade: '',
  });
  const [imageUrl,setUrl]=useState("")

  const [studentsData, setStudentsData] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [enrollmentPopupOpen, setEnrollmentPopupOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setEditMode(false);
    setFormErrors({});
    setNewStudent({
      studentName: '',
      gender:"Male",
      email:'',
      gender:selectedGender,
      year:'',
      dept: '',
      quota: '',
      contactnum: '',
      address: '',
      age:'',
      avggrade: '',
      dob:'',
      totalFees:'',
      feesPaid:'',
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
           },
      ];
      const userDetail={
        email:newStudent.email,
        password:"12345",
        role:"STUDENT"
      }
      axios.post("http://localhost:8080/auth/register",userDetail,{
        headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
        }
      }).then((response)=>{console.log(response)}).catch((error)=>{if(error.response.status===403){
        localStorage.clear();
        alert("Something went Wrong..! Try logging in again")
        nav("/login")
      }})
      setStudentsData(updatedStudents);
      axios.post("http://localhost:8080/students",newStudent,{
        headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
        }
      }).then((response)=>{console.log(response)}).catch((error)=>{if(error.response.status===403){
        localStorage.clear();
        alert("Something went Wrong..! Try logging in again")
        nav("/login")
      }})
      setIsOpen(false);
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (student) => {
    const errors = {};

    if (!student.studentName.trim()) {
      errors.studentName = 'studentName is required';
    }

    if (!student.dept.trim()) {
      errors.dept = 'Student Department is required';
    }

    if (!student.quota.trim()) {
      errors.quota = 'Student Quota is required';
    }

    if (!student.contactnum) {
      errors.contactnum = 'Student Contact Number is required';
    }

    if (!student.address.trim()) {
      errors.address = 'Student Address is required';
    }
    if (!student.age) {
      errors.age = 'Student age is required';
    }
    if (!student.year) {
      errors.year = 'Student year is required';
    }
    if (!student.dob.trim()) {
      errors.dob = 'Student Dob is required';
    }
    if (!student.totalFees) {
      errors.totalFees = 'Student Total Fees is required';
    }
    if (!student.feesPaid) {
      errors.feesPaid = 'Student Fees Paid Fees is required';
    }
    if (!student.email.trim()) {
      errors.email = 'Student Email is required';
    }
    return errors;
  };

  const editStudent = (studentId) => {
    const studentToEdit = studentsData.find((student) => student.studentId === studentId);
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
      axios
        .put(`http://localhost:8080/students/${editStudentId}`, newStudent, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log(response);
          const updatedStudents = studentsData.map((student) =>
            student.id === editStudentId ? response.data : student
          );
          setStudentsData(updatedStudents);
          fetchStudents();

        })
        .catch((error) => {
          console.log(error);
        });
      setIsOpen(false);
      setEditMode(false);
    } else {
      setFormErrors(errors);
    }
  };

  const filteredStudents = studentsData.filter((student) => {
    const studentName = student.studentName || '';
    return studentName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  

  const deleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios
        .delete(`http://localhost:8080/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          const updatedStudents = studentsData.filter((student) => student.id !== studentId);
          setStudentsData(updatedStudents);
          fetchStudents();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
const role=localStorage.getItem("role")
const fetchStudents=()=>{
  axios.get("http://localhost:8080/students",{
    headers:{
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json', 
    }}).then(response=>{
      setStudentsData(response.data)
      console.log(studentsData)
      
    }).catch(error=>{
      if(error.response.status===403){
        localStorage.clear();
      alert("Something went Wrong..! Try logging in again")
      nav("/login")
      }
    })
}
  useEffect(() => {
    fetchStudents();
  }, []);
  const handleEnrollmentClick = (studentId) => {
    setSelectedStudentId(studentId);
    setEnrollmentPopupOpen(true);

  };
  const handleEnroll = (courseId) => {
    const enrollmentData = {
      courseId: courseId,
      studentId: selectedStudentId,
    };
  
    axios
      .post('http://localhost:8080/students/enroll', enrollmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Enrollment successful:', response);
      })
      .catch((error) => {
        console.error('Enrollment failed:', error);
      });
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
            
            <img src={student.gender==="Male"
              ? 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'
              : 'https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'
       } alt={student.studentName} />
          </div>
          <div className="student-details">
            <div className="student-info">
              <p className="student-name">{student.studentName}</p>
              <p className="student-id">ID: {student.studentId}</p>
            </div>
            <div className="detail-box">
              <div className="detail">
                <strong>Department:</strong> {student.dept}
              </div>
              <div className="detail">
                <strong>Email:</strong> {student.email}
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
              {role=="ADMIN" ?(
              <div className="button-container">
                <button className="student-button edit" onClick={() => editStudent(student.studentId)}>
                  Edit
                </button>
                <button className="student-button delete" onClick={() => deleteStudent(student.studentId)}>
                  Delete
                </button>
                <button className="student-button enroll" onClick={() => handleEnrollmentClick(student.studentId)}>
                  Enroll
                </button>
              </div>)
              :
              (<></>)
            }
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
            value={newStudent.studentName}
            onChange={(e) => handleFieldChange('studentName', e.target.value)}
          />
          {formErrors.studentName && <p className="error">{formErrors.studentName}</p>}
          <input
            type="text"
            className="student-name"
            placeholder="Student Email"
            value={newStudent.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
          {/* <input
            type="text"
            className="student-id"
            placeholder="Student ID"
            value={newStudent.studentId}
            onChange={(e) => handleFieldChange('studentId', e.target.value)}
          />
          {formErrors.studentId && <p className="error">{formErrors.studentId}</p>} */}
          <div class="gender-div">
          Gender : &nbsp;<select
            className="student-gender"
            value={newStudent.gender}
            onChange={(e) => handleFieldChange('gender', e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
            </div>
            <select
  className="student-dept"
  value={newStudent.dept}
  onChange={(e) => handleFieldChange('dept', e.target.value)}
>
  <option value="">Select a Department</option>
  <option value="ECE">ECE - Electronics and Communication Engineering</option>
  <option value="EEE">EEE - Electrical and Electronics Engineering</option>
  <option value="IT">IT - Information Technology</option>
  <option value="AI&DS">AI&DS - Artificial Intelligence and Data Science</option>
  <option value="AI&ML">AI&ML - Artificial Intelligence and Machine Learning</option>
  <option value="CSE">CSE - Computer Science and Engineering</option>
  <option value="MECH">MECH - Mechanical Engineering</option>
  <option value="CIVIL">CIVIL - Civil Engineering</option>
  {/* Add more department options as needed */}
</select>
{formErrors.dept && <p className="error">{formErrors.dept}</p>}

<select
  className="student-dept"
  value={newStudent.year}
  onChange={(e) => handleFieldChange('year', e.target.value)}
>
  <option value="">Select Year</option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>
{formErrors.year && <p className="error">{formErrors.year}</p>}


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
          <input
            type="number"
            className="student-age"
            placeholder="Age"
            value={newStudent.age}
            onChange={(e) => handleFieldChange('age', e.target.value)}
          />
          {formErrors.age && <p className="error">{formErrors.age}</p>}
          <input
            type="date"
            className="student-dob"
            placeholder="Date Of Birth"
            value={newStudent.dob}
            onChange={(e) => handleFieldChange('dob', e.target.value)}
          />
          {formErrors.dob && <p className="error">{formErrors.dob}</p>}
          <input
            type="number"
            className="student-total"
            placeholder="Total Fees"
            value={newStudent.totalFees}
            onChange={(e) => handleFieldChange('totalFees', e.target.value)}
          />
          {formErrors.totalFees && <p className="error">{formErrors.totalFees}</p>}
          <input
            type="number"
            className="student-feePaid"
            placeholder="Fees Paid"
            value={newStudent.feesPaid}
            onChange={(e) => handleFieldChange('feesPaid', e.target.value)}
          />
          {formErrors.feesPaid && <p className="error">{formErrors.feesPaid}</p>}

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