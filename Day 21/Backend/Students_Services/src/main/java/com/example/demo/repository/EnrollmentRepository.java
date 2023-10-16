package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {
	 @Query("SELECT e.studentId FROM Enrollment e WHERE e.courseId = :courseId")
	    List<Integer> findStudentIdsByCourseId(@Param("courseId") int courseId);
	 @Query("SELECT CASE WHEN COUNT(e) > 0 THEN true ELSE false END FROM Enrollment e WHERE e.studentId = :studentId AND e.courseId = :courseId")
	 boolean existsByStudentIdAndCourseId(@Param("studentId") int studentId, @Param("courseId") int courseId);
	 @Query("SELECT e.courseId FROM Enrollment e WHERE e.studentId = :studentId")
	List<Integer> findcourseIdByStudentId(int studentId);
	 @Query("SELECT e.id FROM Enrollment e WHERE e.courseId = :courseId AND e.studentId = :studentId")
	    Integer findEnrollmentIdByCourseAndStudent(Integer courseId, Integer studentId);
	    
	}

