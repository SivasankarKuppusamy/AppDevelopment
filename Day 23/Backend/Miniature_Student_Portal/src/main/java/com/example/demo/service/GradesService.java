package com.example.demo.service;

import com.example.demo.entity.Grades;
import com.example.demo.repository.GradesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradesService {
	@Autowired
    private  GradesRepository gradesRepository;
    public List<Grades> getAllGrades() {
        return gradesRepository.findAll();
    }

    public Grades getGrade(int studentId, int courseId) {
        return gradesRepository.findByStudentIdAndCourseId(studentId, courseId);
    }

    public Grades createGrade(Grades grade) {
        return gradesRepository.save(grade);
    }

    public Grades updateGrade(int studentId, int courseId, Grades updatedGrade) {
        Grades existingGrade = getGrade(studentId, courseId);
        if (existingGrade != null) {
            existingGrade.setMarks(updatedGrade.getMarks());
            existingGrade.setGrade(updatedGrade.getGrade());
            return gradesRepository.save(existingGrade);
        } else {
            return null; 
        }
    }

    public void deleteGrade(int studentId, int courseId) {
        gradesRepository.deleteByStudentIdAndCourseId(studentId, courseId);
    }
}
