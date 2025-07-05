package com.minigmail.controller;

import com.minigmail.model.User;
import com.minigmail.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if(userRepo.findByEmail(user.getEmail()) != null) {
            return "Email already exists";
        }

        userRepo.save(user);
        return "Signup successfull!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        User existingUser = userRepo.findByEmail(user.getEmail());

        if(existingUser == null) {
            return "User not found!";
        }

        if(!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }

        return "Login successful!";
    }
}
