package com.example.demo.entity;

import java.util.Date;

import org.aspectj.internal.lang.annotation.ajcPrivileged;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class Students {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int studentId;
	private String studentName;
	private String gender;
	private int year;
	private int department;
	private long contactnum;
	private String address;
	private String quota;
	private int age;
	private long totalFees;
	private long feesPaid;
	private Date dob;
}
