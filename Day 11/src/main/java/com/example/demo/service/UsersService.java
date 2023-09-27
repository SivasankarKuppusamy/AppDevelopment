package com.example.demo.service;

import com.example.demo.entity.Users;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

	@Autowired
    private  UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(int id) {
        Optional<Users> userOptional = usersRepository.findById(id);
        return userOptional.orElse(null);
    }

    public Users createUser(Users user) {
        return usersRepository.save(user);
    }

    public Users updateUser(int id, Users updatedUser) {
        Optional<Users> existingUserOptional = usersRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            Users existingUser = existingUserOptional.get();

            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUserType(updatedUser.getUserType());

            return usersRepository.save(existingUser);
        } else {
            return null; 
        }
    }

    public void deleteUser(int id) {
        usersRepository.deleteById(id);
    }
}
