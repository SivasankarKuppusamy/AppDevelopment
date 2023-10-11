package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.Departments;
import com.example.demo.service.DepartmentsService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departments")
public class DepartmentsController {

    @Autowired
    private DepartmentsService departmentsService;

    @GetMapping
    public List<Departments> getAllDepartments() {
        return departmentsService.getAllDepartments();
    }

    @GetMapping("/{id}")
    public Departments getDepartmentById(@PathVariable int id) {
        Optional<Departments> department = departmentsService.getDepartmentById(id);
        return department.orElse(null); 
    }

    @PostMapping
    public Departments createDepartment(@RequestBody Departments department) {
        return departmentsService.createDepartment(department);
    }

    @PutMapping("/{id}")
    public Departments updateDepartment(@PathVariable int id, @RequestBody Departments updatedDepartment) {
        Departments updated = departmentsService.updateDepartment(id, updatedDepartment);
        return updated;
    }

    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable int id) {
        departmentsService.deleteDepartment(id);
    }
}
