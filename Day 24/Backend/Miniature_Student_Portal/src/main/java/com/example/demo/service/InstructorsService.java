package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Instructors;
import com.example.demo.repository.InstructorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorsService {

	@Autowired
    private InstructorRepository instructorsRepository;

    public List<Instructors> getAllInstructors() {
        return instructorsRepository.findAll();
    }

    public Optional<Instructors> getInstructorById(int id) {
        return instructorsRepository.findById(id);
    }

    public Instructors createInstructor(Instructors instructor) {
        return instructorsRepository.save(instructor);
    }

    public Instructors updateInstructor(int id, Instructors updatedInstructor) {
        Optional<Instructors> existingInstructorOptional = instructorsRepository.findById(id);

        if (existingInstructorOptional.isPresent()) {
            Instructors existingInstructor = existingInstructorOptional.get();
            existingInstructor.setInstructorName(updatedInstructor.getInstructorName());
            existingInstructor.setQualification(updatedInstructor.getQualification());
            existingInstructor.setContact(updatedInstructor.getContact());

            return instructorsRepository.save(existingInstructor);
        } else {
            return null;
        }
    }

    public void deleteInstructor(int id) {
        instructorsRepository.deleteById(id);
    }
}
