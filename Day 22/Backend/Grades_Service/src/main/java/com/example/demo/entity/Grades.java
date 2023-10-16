package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Grades {
	@Id
	private int studentId;
	private int courseId;
	private float cia1;
	private float cia2;
	private float final_mark;
	private float lab;
	private float component;
	private float total;
}
