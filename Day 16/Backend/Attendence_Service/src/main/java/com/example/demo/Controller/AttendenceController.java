package com.example.demo.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Service.AttendenceService;
import com.example.demo.entity.Attendence;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/attendence")
public class AttendenceController {

    @Autowired
    private AttendenceService attendenceService;
    @GetMapping("/date")
    public List<Attendence> getAttendenceByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
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
    public Attendence createAttendance(@RequestBody Attendence attendance) {
        return attendenceService.createAttendance(attendance);
    }


    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable int id) {
        attendenceService.deleteAttendance(id);
    }
}
