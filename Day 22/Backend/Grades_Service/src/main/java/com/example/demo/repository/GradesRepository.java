package com.example.demo.repository;

import com.example.demo.entity.Grades;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradesRepository extends JpaRepository<Grades, Integer> {
    Grades findByStudentIdAndCourseId(int studentId, int courseId);
    void deleteByStudentIdAndCourseId(int studentId, int courseId);
    List<Grades> findByCourseId(int courseId);

}
