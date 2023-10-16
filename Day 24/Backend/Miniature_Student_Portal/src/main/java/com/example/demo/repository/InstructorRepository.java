package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Instructors;

public interface InstructorRepository extends JpaRepository<Instructors, Integer> {

}
