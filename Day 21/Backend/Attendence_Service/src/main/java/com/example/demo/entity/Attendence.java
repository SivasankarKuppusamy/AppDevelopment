package com.example.demo.entity;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attendence {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int attendenceId;

	private int hour;
	private String date;
	 @OneToMany(mappedBy = "attendence", cascade = CascadeType.ALL)
	    private List<Values> values;
	 public List<Values> getAbsentStudents() {
	        return this.values
	            .stream()
	            .filter(value -> "Absent".equals(value.getValue()))
	            .collect(Collectors.toList());
	    }
}
