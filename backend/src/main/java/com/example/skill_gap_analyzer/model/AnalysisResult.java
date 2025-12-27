package com.example.skill_gap_analyzer.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class AnalysisResult {
    // Existing fields
    private List<String> currentSkills;
    private List<String> missingSkills;
    private int matchPercentage;
    private Map<String, String> recommendedCourses;

    // NEW FIELDS FOR ATS FEATURE
    private int atsScore;
    private List<String> atsFeedback;
}