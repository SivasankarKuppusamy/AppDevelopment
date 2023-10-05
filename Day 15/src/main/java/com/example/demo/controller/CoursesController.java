package com.example.demo.controller;
import com.example.demo.entity.Courses;
import com.example.demo.service.CoursesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    private CoursesService coursesService;

    @GetMapping
    public List<Courses> getAllCourses() {
        return coursesService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Courses getCourseById(@PathVariable int id) {
        return coursesService.getCourseById(id);
    }

    @PostMapping
    public Courses createCourse(@RequestBody Courses course) {
        return coursesService.createCourse(course);
    }

    @PutMapping("/{id}")
    public Courses updateCourse(@PathVariable int id, @RequestBody Courses updatedCourse) {
        return coursesService.updateCourse(id, updatedCourse);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable int id) {
        coursesService.deleteCourse(id);
    }
}
