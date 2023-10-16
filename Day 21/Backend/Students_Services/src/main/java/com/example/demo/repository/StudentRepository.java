package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Students;

@Repository
public interface StudentRepository extends JpaRepository<Students, Integer>{
	 @Query("SELECT DISTINCT s.dept FROM Students s")
	    List<String> findUniqueDepartments();
	 @Query("SELECT s FROM Students s WHERE s.dept = :department AND s.year = :year")
	    List<Students> findStudentsByDepartmentAndYear(@Param("department") String department, @Param("year") String year);
	
}
