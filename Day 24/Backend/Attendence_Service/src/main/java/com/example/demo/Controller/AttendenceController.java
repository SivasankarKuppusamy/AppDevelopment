package com.example.demo.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Service.AttendenceService;
import com.example.demo.entity.Attendence;
import com.example.demo.entity.Values;
import com.example.demo.repository.AttendanceValueRepository;
import com.example.demo.repository.AttendenceRepository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attendence")
public class AttendenceController {

    @Autowired
    private AttendenceService attendenceService;
    @Autowired
    private AttendenceRepository attendanceRepository;

    @Autowired
    private AttendanceValueRepository attendanceValueRepository;
    @GetMapping("/get/{hour}/{date}")
    public ResponseEntity<List<Values>> getAttendanceByHourAndDate(
            @PathVariable int hour,
            @PathVariable String date) {
        List<Attendence> attendances = fetchAttendances(hour, date);
        
        if (attendances.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Attendence attendence = attendances.get(0);
        List<Values> details = fetchValuesForAttendence(attendence);
        return ResponseEntity.ok(details);
    }

    private List<Attendence> fetchAttendances(int hour, String date) {
        return attendanceRepository.findByHourAndDate(hour, date);
    }

    private List<Values> fetchValuesForAttendence(Attendence attendence) {
        int attendenceId = attendence.getAttendenceId();
        return attendanceValueRepository.findByAttendenceId(attendenceId);
    }



    @GetMapping("/date")
    public List<Attendence> getAttendenceByDate(@RequestParam  String date) {
        return attendenceService.getAttendenceByDate(date);
    }
    @GetMapping
    public List<Attendence> getAllAttendance() {
        return attendenceService.getAllAttendance();
    }

    @GetMapping("/{id}")
    public Attendence getAttendanceById(@PathVariable int id) {
        Optional<Attendence> attendance = attendenceService.getAttendanceById(id);
        return attendance.orElse(null);  
    }

    @PostMapping
    public String createAttendance(@RequestBody Attendence attendance) {
        return attendenceService.createAttendance(attendance);
    }


    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable int id) {
        attendenceService.deleteAttendance(id);
    }
}
