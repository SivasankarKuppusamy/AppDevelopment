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
            existingStudent.setStudentName(updatedStudent.getStudentName());
            existingStudent.setGender(updatedStudent.getGender());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setContactnum(updatedStudent.getContactnum());
            existingStudent.setYear(updatedStudent.getYear());
            existingStudent.setQuota(updatedStudent.getQuota());
            existingStudent.setAddress(updatedStudent.getAddress());
            existingStudent.setAge(updatedStudent.getAge());
            existingStudent.setTotalFees(updatedStudent.getTotalFees());
            existingStudent.setFeesPaid(updatedStudent.getFeesPaid());
            existingStudent.setDept(updatedStudent.getDept());
            existingStudent.setDob(updatedStudent.getDob());

            return studentRepository.save(existingStudent);
        } else {
            throw new RuntimeException("Student not found with ID: " + id);
        }
    }

    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }
}
