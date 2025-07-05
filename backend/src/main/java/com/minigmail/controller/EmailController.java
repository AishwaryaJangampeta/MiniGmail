package com.minigmail.controller;

import com.minigmail.model.Email;
import com.minigmail.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.PrivateKey;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class EmailController {

    @Autowired
    private EmailRepository emailRepo;

    @PostMapping("/send")
    public String sendEmail(@RequestBody Email email){
        emailRepo.save(email);
        return "Email sent successfully!";
    }

    @GetMapping("/inbox")
    public List<Email> getInbox(@RequestParam String email){
        return emailRepo.findByToAndDeletedFalse(email);
    }

    @GetMapping("/sent")
    public List<Email> getSent(@RequestParam String email){
        return emailRepo.findByFromAndDeletedFalse(email);
    }

    @PutMapping("/delete")
    public String deleteEmail(@RequestParam String id){
        Email email = emailRepo.findById(id).orElse(null);
        if(email != null){
            email.setDeleted(true);
            emailRepo.save(email);
            return "Email deleted.";
        }
        return "Email not found";
    }
}
