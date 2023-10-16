package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Attendence;
import com.example.demo.entity.Values;
import com.example.demo.repository.AttendanceValueRepository;
import com.example.demo.repository.AttendenceRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AttendenceService {

	@Autowired
    private  AttendenceRepository attendenceRepository;
@Autowired AttendanceValueRepository valuesRepository;
    public AttendenceService(AttendenceRepository attendenceRepository) {
        this.attendenceRepository = attendenceRepository;
    }

    public List<Attendence> getAllAttendance() {
        return attendenceRepository.findAll();
    }
    public List<Attendence> getAttendenceByDate(String date) {
       
        return attendenceRepository.findByDate(date);
    }

    public Optional<Attendence> getAttendanceById(int id) {
        return attendenceRepository.findById(id);
    }

    public String createAttendance(Attendence attendance) {
        // Check if an attendance record with the same hour, date, and student exists
        Attendence existingAttendance = attendenceRepository.findByHourAndDateAndStudentId(
            attendance.getHour(), attendance.getDate(), attendance.getValues().get(0).getStudentId()
        );
        
        if (existingAttendance != null) {
            // An attendance record already exists
            if (valuesAreDifferent(existingAttendance, attendance)) {
                // Update the existing record if the values are different
                existingAttendance.setValues(attendance.getValues());
                attendenceRepository.save(existingAttendance);
                return "Attendance Updated";
            } else {
                // Values are the same, no need to update
                return "Attendance Already Posted";
            }
        } else {
            // No existing attendance, create a new record
            Attendence savedAttendence = attendenceRepository.save(attendance);
            int attendenceId = savedAttendence.getAttendenceId();
            List<Values> values = savedAttendence.getValues();
            if (values != null) {
                for (Values value : values) {
                    value.setAttendence(savedAttendence);
                }
            }
            valuesRepository.saveAll(values);
            return "Attendance Posted";
        }
    }

    private boolean valuesAreDifferent(Attendence existing, Attendence updated) {
        List<Values> existingValues = existing.getValues();
        List<Values> updatedValues = updated.getValues();
        
        // Check if the values are different by comparing each student's value
        for (int i = 0; i < existingValues.size(); i++) {
            if (!existingValues.get(i).getValue().equals(updatedValues.get(i).getValue())) {
                return true; // Values are different
            }
        }
        
        return false; // Values are the same
    }



    
    

    public void deleteAttendance(int id) {
        attendenceRepository.deleteById(id);
    }
}
