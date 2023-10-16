package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Enrollment;
import com.example.demo.entity.Students;
import com.example.demo.repository.EnrollmentRepository;
import com.example.demo.service.StudentService;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
    private  StudentService studentService;
	
	    @Autowired
	    private EnrollmentRepository enrollmentRepository;

	

	    @PostMapping("/enroll")
	    public ResponseEntity<String> enrollStudentInCourse(@RequestBody Enrollment enrollment) {
	        if (enrollmentRepository.existsByStudentIdAndCourseId(enrollment.getStudentId(), enrollment.getCourseId())) {
	            return ResponseEntity.badRequest().body("Student is already enrolled in this course.");
	        }

	        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);

	        return ResponseEntity.ok("Enrollment successful");
	    }

	    @GetMapping("/enrollments/{courseId}")
	    public List<Students> getEnrolledStudents(@PathVariable int courseId ){
	    	return studentService.getAllStudentsByCourseId(courseId);
	    }
	    @GetMapping("/enrollments/students/{studentId}")
	    public List<?> getEnrolledCourses (@PathVariable int studentId){
	    	return studentService.getEnrolledCoursesSer(studentId);
	    }
    @GetMapping
    public List<Students> getAllStudents() {
        return studentService.getAllStudents();
    }
    @GetMapping("/unique/departments")
    public List<String> getUniqueDepartments() {
        return studentService.getUniqueDepartments();
    }
    @GetMapping("/department/{department}/year/{year}")
    public List<Students> getStudentsByDepartmentAndYear(@PathVariable String department, @PathVariable String year) {
        return studentService.getStudentsByDepartmentAndYear(department, year);
    }
    @GetMapping("/{id}")
    public Optional<Students> getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Students createStudent(@RequestBody Students student) {
        return studentService.createStudent(student);
    }

    @PutMapping("/{id}")
    public Students updateStudent(@PathVariable int id, @RequestBody Students updatedStudent) {
        return studentService.updateStudent(id, updatedStudent);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
    }
    @DeleteMapping("/deleteEnroll/{id}")
    public void deleteEnrollment(@PathVariable int id) {
    	enrollmentRepository.deleteById(id);
    }
}
