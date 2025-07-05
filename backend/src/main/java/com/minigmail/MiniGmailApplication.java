package com.minigmail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.annotation.AliasFor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController


public class MiniGmailApplication {

    @RequestMapping("/test")
    String home() {
        return "Welcome to Mini-Gmail";
    }

    public static void main(String[] args) {
        SpringApplication.run(MiniGmailApplication.class, args);
    }
}
