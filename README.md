# 🚀 AI-Powered Skill Gap Analyzer & Career Coach

A Full-Stack Enterprise Application that helps students bridge the gap between their resume and their dream job. It uses Rule-Based AI to analyze resumes, identify missing skills, and generate personalized learning roadmaps and mock interview questions.

![Project Status](https://img.shields.io/badge/Status-Complete-success)
![Tech Stack](https://img.shields.io/badge/Stack-FullStack-blue)

## ✨ Key Features
* **🔐 Secure Authentication:** Full JWT-based Login/Register system with Spring Security.
* **🛡️ Data Privacy:** Users have private accounts; history is isolated per user.
* **📄 Smart Parsing:** Extracts text from PDF resumes using Apache PDFBox.
* **🤖 Custom Job Analysis:** Compare your resume against *any* pasted Job Description (JD).
* **📊 Visual Analytics:** Interactive Radar Charts (Chart.js) and Skill Gap scoring.
* **🗺️ Career Roadmap:** Auto-generates a step-by-step learning path for missing skills with free resource links.
* **🎤 Mock Interview Mode:** Generates technical interview questions based on the specific skills found in your resume.
* **🌗 Modern UI:** Fully responsive React Dashboard with Dark Mode support and Hamburger navigation.

## 🛠️ Tech Stack
### Frontend
* **React.js (Vite):** Fast, component-based UI.
* **Tailwind CSS:** Modern styling and Dark Mode engine.
* **Chart.js:** For the Radar Skill visualization.
* **Axios:** For API communication.
* **Lucide React:** Beautiful icons.

### Backend
* **Java Spring Boot:** REST API architecture.
* **Spring Security + JWT:** For secure stateless authentication.
* **Apache PDFBox:** To read and parse PDF files.
* **Hibernate/JPA:** For database interactions.

### Database
* **MySQL:** Stores User profiles, Encrypted Passwords, and Analysis History.

## 🚀 How to Run Locally

### 1. Database Setup
Ensure MySQL is running and create a database:
```sql
CREATE DATABASE skill_gap_db;