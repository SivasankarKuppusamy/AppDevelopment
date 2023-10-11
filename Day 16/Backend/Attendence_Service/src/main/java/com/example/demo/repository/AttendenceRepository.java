package com.example.demo.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Attendence;

public interface AttendenceRepository extends JpaRepository<Attendence, Integer>{
	@Query("SELECT a FROM Attendence a WHERE a.date = :date")
    List<Attendence> findByDate(@Param("date") Date date);
}
