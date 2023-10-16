package com.example.demo.repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Attendence;

public interface AttendenceRepository extends JpaRepository<Attendence, Integer>{
	@Query("SELECT a FROM Attendence a WHERE a.date = :date")
    List<Attendence> findByDate(@Param("date") String date);
	@Query("SELECT a FROM Attendence a WHERE a.date = :date and a.hour= :hour")
    List<Attendence> findByHourAndDate( @Param("hour") int hour, @Param("date") String date);
    @Query("SELECT a FROM Attendence a JOIN a.values v WHERE a.hour = :hour AND a.date = :date AND v.studentId = :studentId")
	    Attendence findByHourAndDateAndStudentId(@Param("hour") int hour, @Param("date") String date, @Param("studentId") int studentId);


}
