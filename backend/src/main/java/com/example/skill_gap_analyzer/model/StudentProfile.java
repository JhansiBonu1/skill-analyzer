package com.example.skill_gap_analyzer.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
@Data
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String targetRole;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String resumeText;

    private String name;
    private String email;
    
    // NEW: Who owns this data?
    private String username; 

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String aiAnalysisJson;

    private LocalDateTime uploadedAt = LocalDateTime.now();
}