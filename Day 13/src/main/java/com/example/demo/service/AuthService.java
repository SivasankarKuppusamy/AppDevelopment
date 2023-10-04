package com.example.demo.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor

public class AuthService {
	@Autowired 
	private UsersRepository userRepository;
    private final PasswordEncoder passwordEncoder;


	public Optional<Users> validateUser(String email,String password) {
		Optional<Users> user=userRepository.findByEmail(email);
		 if (user.isPresent() && user.get().getPassword().equals(password)) {
	            return user;
	        }
		return null;
		
	}
	
	public ResponseEntity<String> userRegisration (RegisterRequest req) {
		Optional<Users> isUserAvailable=userRepository.findByEmail(req.getEmail());
		if(!isUserAvailable.isPresent()) {
			Users user = Users.builder()
		            .email(req.getEmail()).password(passwordEncoder.encode(req.getPassword()))
		            .role(req.getRole())
		            .build();	
			userRepository.save(user);
	        return ResponseEntity.status(HttpStatus.CREATED).body("User Registered Successfully");
		}
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Already Exists");
	}
}
