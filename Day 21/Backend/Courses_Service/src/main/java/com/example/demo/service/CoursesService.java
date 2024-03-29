package com.example.demo.service;

import com.example.demo.entity.Courses;
import com.example.demo.repository.CoursesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CoursesService {

	@Autowired
    private  CoursesRepository coursesRepository;

    public List<Courses> getAllCourses() {
        return coursesRepository.findAll();
    }

    public Courses getCourseById(int id) {
        Optional<Courses> courseOptional = coursesRepository.findById(id);
        return courseOptional.orElse(null);
    }

    public Courses createCourse(Courses course) {
        return coursesRepository.save(course);
    }

    public Courses updateCourse(int id, Courses updatedCourse) {
        Optional<Courses> existingCourseOptional = coursesRepository.findById(id);

        if (existingCourseOptional.isPresent()) {
            Courses existingCourse = existingCourseOptional.get();

            existingCourse.setTitle(updatedCourse.getTitle());
            existingCourse.setDescription(updatedCourse.getDescription());
            existingCourse.setImageSrc(updatedCourse.getImageSrc());

            return coursesRepository.save(existingCourse);
        } else {
            return null; 
        }
    }

    public void deleteCourse(int id) {
        coursesRepository.deleteById(id);
    }

	public List<Courses> getCourseByIdforEnrollment(int id) {
		
		Optional<Courses> OpCourse=coursesRepository.findById(id);
		List<Courses> listOfCourse=new ArrayList<>();
		OpCourse.ifPresent(listOfCourse::add);
		return listOfCourse;
	}
}
