package com.minigmail.repository;

import com.minigmail.model.Email;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmailRepository extends MongoRepository<Email, String> {

    List<Email> findByToAndDeletedFalse(String to);
    List<Email> findByFromAndDeletedFalse(String from);
}
