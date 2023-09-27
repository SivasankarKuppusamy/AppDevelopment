package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Grades;
import com.example.demo.service.GradesService;

@RestController
@RequestMapping("/grades")
public class GradesController {

    @Autowired
    private GradesService gradesService;

    @GetMapping
    public List<Grades> getAllGrades() {
        return gradesService.getAllGrades();
    }

    @GetMapping("/{studentId}/{courseId}")
    public Grades getGrade(@PathVariable int studentId, @PathVariable int courseId) {
        return gradesService.getGrade(studentId, courseId);
    }

    @PostMapping
    public Grades createGrade(@RequestBody Grades grade) {
        return gradesService.createGrade(grade);
    }

    @PutMapping("/{studentId}/{courseId}")
    public Grades updateGrade(@PathVariable int studentId,@PathVariable int courseId,@RequestBody Grades updatedGrade
    ) {
        return gradesService.updateGrade(studentId, courseId, updatedGrade);
    }

    @DeleteMapping("/{studentId}/{courseId}")
    public void deleteGrade(@PathVariable int studentId, @PathVariable int courseId) {
        gradesService.deleteGrade(studentId, courseId);
    }
}
