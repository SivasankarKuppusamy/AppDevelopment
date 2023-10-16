package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Attendence;
import com.example.demo.entity.Values;

public interface AttendanceValueRepository extends JpaRepository<Values, Integer> {
    @Query("SELECT v FROM Values v WHERE v.attendence = :attendence")
    List<Values> findByAttendence(@Param("attendence") Attendence attendence);
    @Query(value = "SELECT * FROM attendance_values  WHERE attendence_id = :attendenceId", nativeQuery = true)
    List<Values> findByAttendenceId(@Param("attendenceId") int attendenceId);
}
