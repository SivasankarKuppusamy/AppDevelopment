package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Departments;
import com.example.demo.repository.DepartmentsRepository;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentsService {

	@Autowired
    private DepartmentsRepository departmentsRepository;

    public DepartmentsService(DepartmentsRepository departmentsRepository) {
        this.departmentsRepository = departmentsRepository;
    }

    public List<Departments> getAllDepartments() {
        return departmentsRepository.findAll();
    }

    public Optional<Departments> getDepartmentById(int id) {
        return departmentsRepository.findById(id);
    }

    public Departments createDepartment(Departments department) {
        return departmentsRepository.save(department);
    }

    public Departments updateDepartment(int id, Departments updatedDepartment) {
        Optional<Departments> existingDepartmentOptional = departmentsRepository.findById(id);

        if (existingDepartmentOptional.isPresent()) {
            Departments existingDepartment = existingDepartmentOptional.get();
            existingDepartment.setDepartmentName(updatedDepartment.getDepartmentName());

            return departmentsRepository.save(existingDepartment);
        } else {
            return null; 
        }
    }

    public void deleteDepartment(int id) {
        departmentsRepository.deleteById(id);
    }
}
