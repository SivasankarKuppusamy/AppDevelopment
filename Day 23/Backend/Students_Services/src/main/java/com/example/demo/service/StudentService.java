package com.example.demo.service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.demo.entity.CoursesDetails;
import com.example.demo.entity.Students;
import com.example.demo.repository.EnrollmentRepository;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

	@Autowired
    private  StudentRepository studentRepository;
	@Autowired
	private  EnrollmentRepository enrollmentRepository;
	@Autowired
	  RestTemplate restTemplate;
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Students> getAllStudents() {
        return studentRepository.findAll();
    }
    public List<String> getUniqueDepartments() {
        return studentRepository.findUniqueDepartments();
    }
  
    public List<Students> getStudentsByDepartmentAndYear(String department, String year) {
        return studentRepository.findStudentsByDepartmentAndYear(department, year);
    }
    public List<Students> getAllStudentsByCourseId(int courseId) {
        List<Integer> studentIds = enrollmentRepository.findStudentIdsByCourseId(courseId);
        List<Students> studentsEnrolled = new ArrayList<Students>();

        for (Integer studentId : studentIds) {
            Optional<Students> studentOptional = studentRepository.findById(studentId);
            studentOptional.ifPresent(studentsEnrolled::add);
        }

        return studentsEnrolled;
    }
   

    public Optional<Students> getStudentById(int id) {
        return studentRepository.findById(id);
    }

    public Students createStudent(Students student) {
        return studentRepository.save(student);
    }

    public Students updateStudent(int id, Students updatedStudent) {
        Optional<Students> existingStudentOptional = studentRepository.findById(id);

        if (existingStudentOptional.isPresent()) {
            Students existingStudent = existingStudentOptional.get();

            if (updatedStudent.getFeesPaid() != 0) {
                existingStudent.setFeesPaid(updatedStudent.getFeesPaid());
            }
            if (updatedStudent.getStudentName() != null) {
                existingStudent.setStudentName(updatedStudent.getStudentName());
            }
            if (updatedStudent.getGender() != null) {
                existingStudent.setGender(updatedStudent.getGender());
            }
            if (updatedStudent.getEmail() != null) {
                existingStudent.setEmail(updatedStudent.getEmail());
            }
            if (updatedStudent.getContactnum() != 0) {
                existingStudent.setContactnum(updatedStudent.getContactnum());
            }
            if (updatedStudent.getYear() != 0) {
                existingStudent.setYear(updatedStudent.getYear());
            }
            if (updatedStudent.getQuota() != null) {
                existingStudent.setQuota(updatedStudent.getQuota());
            }
            if (updatedStudent.getAddress() != null) {
                existingStudent.setAddress(updatedStudent.getAddress());
            }
            if (updatedStudent.getAge() != 0) {
                existingStudent.setAge(updatedStudent.getAge());
            }
            if (updatedStudent.getTotalFees() != 0) {
                existingStudent.setTotalFees(updatedStudent.getTotalFees());
            }
            if (updatedStudent.getDept() != null) {
                existingStudent.setDept(updatedStudent.getDept());
            }
            if (updatedStudent.getDob() != null) {
                existingStudent.setDob(updatedStudent.getDob());
            }

            return studentRepository.save(existingStudent);
        } else {
            throw new RuntimeException("Student not found with ID: " + id);
        }
    }
    

    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }
    public void deleteEnrollment(int id) {
    	enrollmentRepository.deleteById(id);
    }

    public List<CoursesDetails> getEnrolledCoursesSer(int studentId) {
        List<Integer> courseIds = enrollmentRepository.findcourseIdByStudentId(studentId);
        List<CoursesDetails> enrolledCourses = new ArrayList<>();
        String courseServiceBaseUrl = "http://localhost:8080"; 
        RestTemplate restTemplate = new RestTemplate();
        for (Integer courseId : courseIds) {
            String courseUrl = courseServiceBaseUrl + "/courses/" + courseId;
            ResponseEntity<CoursesDetails> response = restTemplate.exchange(
                courseUrl,
                HttpMethod.GET,
                null,
                CoursesDetails.class,
                courseId
            );
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                CoursesDetails courseDetails = response.getBody();

                int enrollmentId = enrollmentRepository.findEnrollmentIdByCourseAndStudent(courseId, studentId);
                courseDetails.setEnrollmentId(enrollmentId);
                enrolledCourses.add(courseDetails);
            }
        }

        return enrolledCourses;
    }

    
}
