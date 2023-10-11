package com.example.demo.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Students;
import com.example.demo.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

	@Autowired
    private  StudentRepository studentRepository;

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
}
