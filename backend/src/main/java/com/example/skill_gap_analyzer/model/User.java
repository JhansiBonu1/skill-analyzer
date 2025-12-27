package com.example.skill_gap_analyzer.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // This will be the email

    @Column(nullable = false)
    private String password; // This will be encrypted
}
