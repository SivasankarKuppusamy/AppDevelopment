package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Instructors;
import com.example.demo.service.InstructorsService;

@RestController
@RequestMapping("/instructors")
public class InstructorsController {
    @Autowired
    private InstructorsService instructorsService;

    @GetMapping
    public List<Instructors> getAllInstructors() {
        return instructorsService.getAllInstructors();
    }

    @GetMapping("/{id}")
    public Instructors getInstructorById(@PathVariable int id) {
        Optional<Instructors> instructor = instructorsService.getInstructorById(id);
        return instructor.orElse(null); // Return null if instructor is not found
    }


    @PutMapping("/{id}")
    public Instructors updateInstructor(@PathVariable int id, @RequestBody Instructors updatedInstructor) {
        Instructors updated = instructorsService.updateInstructor(id, updatedInstructor);
        return updated;
    }

    @DeleteMapping("/{id}")
    public void deleteInstructor(@PathVariable int id) {
        instructorsService.deleteInstructor(id);
    }
}
