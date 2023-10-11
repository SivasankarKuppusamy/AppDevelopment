package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Attendence;
import com.example.demo.repository.AttendenceRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AttendenceService {

	@Autowired
    private  AttendenceRepository attendenceRepository;

    public AttendenceService(AttendenceRepository attendenceRepository) {
        this.attendenceRepository = attendenceRepository;
    }

    public List<Attendence> getAllAttendance() {
        return attendenceRepository.findAll();
    }
    public List<Attendence> getAttendenceByDate(Date date) {
       
        return attendenceRepository.findByDate(date);
    }

    public Optional<Attendence> getAttendanceById(int id) {
        return attendenceRepository.findById(id);
    }

    public Attendence createAttendance(Attendence attendance) {
        return attendenceRepository.save(attendance);
    }

    
    

    public void deleteAttendance(int id) {
        attendenceRepository.deleteById(id);
    }
}
