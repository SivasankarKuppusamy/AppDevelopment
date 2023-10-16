package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Departments;

public interface DepartmentsRepository extends JpaRepository<Departments, Integer>{

}
