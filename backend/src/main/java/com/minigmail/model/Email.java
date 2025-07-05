package com.minigmail.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emails")
public class Email {

    @Id
    private String id;
    private String from;
    private String to;
    private String subject;
    private String body;
    private String timestamp;

    private boolean deleted = false;

    public Email() {}

    public Email(String from, String to, String subject, String body, String timestamp){
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.body = body;
        this.timestamp = timestamp;
    }

    public String getId(){
        return id;
    }

    public String getFrom(){
        return from;
    }
    public void setFrom(String from){
        this.from = from;
    }

    public String getTo(){
        return to;
    }
    public void setTo(String to){
        this.to = to;
    }

    public String getSubject(){
        return subject;
    }
    public void setSubject(String subject){
        this.subject = subject;
    }

    public String getBody(){
        return body;
    }
    public void setBody(String body){
        this.body = body;
    }

    public String getTimestamp(){
        return timestamp;
    }
    public void setTimestamp(String timestamp){
        this.timestamp = timestamp;
    }

    public boolean isDeleted(){
        return deleted;
    }
    public void setDeleted(boolean deleted){
        this.deleted = deleted;
    }

}
