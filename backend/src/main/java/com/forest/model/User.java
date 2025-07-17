package com.forest.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String username;
    
    private String password;
    private String name;
    private String phone;
    private String email;
    
    @Enumerated(EnumType.STRING)
    private UserRole role;
    
    private boolean enabled = true;
    private LocalDateTime lastLoginTime;
    
    public enum UserRole {
        ADMIN,
        OPERATOR,
        VIEWER
    }
}