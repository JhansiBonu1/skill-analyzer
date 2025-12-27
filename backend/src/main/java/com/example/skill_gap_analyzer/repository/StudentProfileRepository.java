package com.example.skill_gap_analyzer.repository;

import com.example.skill_gap_analyzer.model.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    // Find all profiles belonging to a specific user, sorted by ID (newest first)
    List<StudentProfile> findByUsernameOrderByIdDesc(String username);
}