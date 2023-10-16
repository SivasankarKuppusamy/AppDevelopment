package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "attendance_values")
@NoArgsConstructor
@AllArgsConstructor
public class Values {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int studentId;
    private String value;
    @ManyToOne
    @JoinColumn(name = "attendenceId")
    private Attendence attendence;
}
