package com.example.skill_gap_analyzer.controller;

import com.example.skill_gap_analyzer.model.AnalysisResult;
import com.example.skill_gap_analyzer.model.StudentProfile;
import com.example.skill_gap_analyzer.repository.StudentProfileRepository;
import com.fasterxml.jackson.databind.ObjectMapper; // Used to save JSON to DB

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
// Note: We don't need Sort import anymore because the Repository method handles sorting

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    @Autowired
    private StudentProfileRepository repository;

    // MASTER LIST of keywords to look for in Job Descriptions (Custom Mode)
    private static final List<String> TECH_KEYWORDS = List.of(
        "Java", "Python", "C++", "JavaScript", "React", "Angular", "Vue", "Node.js", "Spring Boot", "Django",
        "HTML", "CSS", "SQL", "MySQL", "PostgreSQL", "MongoDB", "AWS", "Azure", "Docker", "Kubernetes",
        "Git", "Jenkins", "DevOps", "Machine Learning", "AI", "Data Analysis", "Pandas", "Tableau",
        "Communication", "Teamwork", "Agile", "Scrum", "Rest API", "Microservices", "Linux", "Excel",
        "Cybersecurity", "Network", "Android", "iOS", "Flutter", "Swift", "Kotlin", "Redux", "TypeScript"
    );

    @PostMapping("/upload")
    public ResponseEntity<AnalysisResult> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam("role") String targetRole,
            @RequestParam(value = "jobDescription", required = false) String jobDescription,
            @RequestParam(value = "username", required = false) String username // NEW: User Privacy
    ) {
        try {
            // 1. Extract Text from PDF
            String resumeText = extractTextFromPdf(file);
            String lowerCaseResume = resumeText.toLowerCase();

            // 2. DETERMINE REQUIRED SKILLS
            List<String> requiredSkills;

            if (jobDescription != null && !jobDescription.trim().isEmpty()) {
                // Scenario A: Extract skills from pasted Job Description
                requiredSkills = extractSkillsFromText(jobDescription);
                if (requiredSkills.isEmpty()) {
                    requiredSkills = List.of("Communication", "Problem Solving"); // Fallback
                }
            } else {
                // Scenario B: Use Hardcoded Roles
                requiredSkills = getSkillsForRole(targetRole);
            }

            // 3. COMPARE RESUME VS REQUIRED
            List<String> currentSkills = new ArrayList<>();
            List<String> missingSkills = new ArrayList<>();
            Map<String, String> recommendedCourses = new HashMap<>();

            for (String skill : requiredSkills) {
                if (lowerCaseResume.contains(skill.toLowerCase())) {
                    currentSkills.add(skill);
                } else {
                    missingSkills.add(skill);
                    // Generate dynamic Google Search link for learning
                    recommendedCourses.put(skill, "https://www.google.com/search?q=free+course+" + skill);
                }
            }

            // 4. CALCULATE MATCH SCORE
            int matchScore = 0;
            if (!requiredSkills.isEmpty()) {
                matchScore = (int) (((double) currentSkills.size() / requiredSkills.size()) * 100);
            }

            // 5. ATS ROBOT ANALYSIS (Rule-Based)
            int atsScore = 100;
            List<String> atsFeedback = new ArrayList<>();
            
            // Rule: Length
            int wordCount = resumeText.split("\\s+").length;
            if (wordCount < 150) { 
                atsScore -= 20; 
                atsFeedback.add("Resume is too short (" + wordCount + " words). Aim for 300+ words."); 
            }
            
            // Rule: Sections
            if (!lowerCaseResume.contains("education")) { 
                atsScore -= 15; 
                atsFeedback.add("Missing 'Education' section."); 
            }
            if (!lowerCaseResume.contains("experience") && !lowerCaseResume.contains("projects")) { 
                atsScore -= 15; 
                atsFeedback.add("Missing 'Experience' or 'Projects' section."); 
            }
            
            // Rule: Contact Info
            if (!resumeText.contains("@")) { 
                atsScore -= 20; 
                atsFeedback.add("No email address found."); 
            }

            atsScore = Math.max(0, atsScore);
            
            // Create Result Object
            AnalysisResult result = new AnalysisResult(currentSkills, missingSkills, matchScore, recommendedCourses, atsScore, atsFeedback);

            // 6. SAVE TO DATABASE
            StudentProfile profile = new StudentProfile();
            profile.setTargetRole(targetRole);
            profile.setResumeText(resumeText);
            profile.setName("Student");
            
            // PRIVACY UPDATE: Save who uploaded this
            if (username != null && !username.equals("null")) {
                profile.setUsername(username);
            }

            // SAVE JSON for clickable history
            ObjectMapper mapper = new ObjectMapper();
            String jsonResult = mapper.writeValueAsString(result);
            profile.setAiAnalysisJson(jsonResult);
            
            repository.save(profile);

            // 7. RETURN RESULT
            return ResponseEntity.ok(result);

        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // UPDATED HISTORY ENDPOINT: Filters by Username
    @GetMapping("/history")
    public ResponseEntity<List<StudentProfile>> getHistory(@RequestParam(value = "username", required = false) String username) {
        if (username != null && !username.isEmpty() && !username.equals("null")) {
            // Return only this user's history
            return ResponseEntity.ok(repository.findByUsernameOrderByIdDesc(username));
        }
        // If no user is logged in, return nothing (Privacy!)
        return ResponseEntity.ok(List.of());
    }

    // --- HELPERS ---

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private List<String> extractSkillsFromText(String text) {
        String lowerText = text.toLowerCase();
        return TECH_KEYWORDS.stream()
                .filter(keyword -> lowerText.contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    // Expanded Job Roles List
    private List<String> getSkillsForRole(String role) {
        Map<String, List<String>> roles = new HashMap<>();
        
        // Classic Roles
        roles.put("Full Stack Developer", List.of("Java", "Spring Boot", "React", "MySQL", "Docker", "AWS"));
        roles.put("Data Scientist", List.of("Python", "Pandas", "Machine Learning", "SQL", "Tableau"));
        roles.put("DevOps Engineer", List.of("Linux", "Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"));
        
        // NEW ROLES ADDED
        roles.put("Frontend Developer", List.of("JavaScript", "React", "CSS", "HTML", "Redux", "TypeScript", "Tailwind"));
        roles.put("Backend Developer", List.of("Java", "Spring Boot", "Microservices", "PostgreSQL", "Redis", "Kafka"));
        roles.put("Mobile App Developer", List.of("Flutter", "Dart", "Firebase", "Android", "iOS", "React Native"));
        roles.put("Cybersecurity Analyst", List.of("Linux", "Python", "Network Security", "Wireshark", "Ethical Hacking", "SIEM"));
        roles.put("Cloud Engineer", List.of("AWS", "Azure", "Linux", "Terraform", "Docker", "Python"));
        
        return roles.getOrDefault(role, List.of("Communication", "Problem Solving"));
    }
}