import { useState } from 'react';
import axios from 'axios';
import SkillChart from './SkillChart';
import Roadmap from './Roadmap';
import { UploadCloud, AlertCircle, BookOpen, FileText, Cpu, MessageCircle } from 'lucide-react';
import InterviewModal from './InterviewModal';
// 1. ACCEPT 'isDarkMode' AS A PROP FROM APP.JSX
const UploadResume = ({ isDarkMode }) => {
    const [file, setFile] = useState(null);
    const [mode, setMode] = useState("predefined"); 
    const [role, setRole] = useState("Full Stack Developer"); 
    const [jobDesc, setJobDesc] = useState(""); 
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showInterview, setShowInterview] = useState(false);
    
    // Note: We removed the internal history state and fetch logic
    // because History is now on its own page!

    const handleUpload = async () => {
        if (!file) return alert("Please select a file first!");
        
        const formData = new FormData();
        formData.append("file", file);
        
        // NEW: Send the logged-in username
        const username = localStorage.getItem("username");
        if (username) {
            formData.append("username", username);
        }

        if (mode === "custom") {
            if (!jobDesc) return alert("Please paste the Job Description!");
            formData.append("role", "Custom Job");
            formData.append("jobDescription", jobDesc);
        } else {
            formData.append("role", role);
        }

        setIsLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/resume/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResult(response.data);
            // We don't need to refresh history here anymore
        } catch (error) {
            console.error(error);
            alert("Analysis failed. Check Backend.");
        } finally {
            setIsLoading(false);
        }
    };

    // Dynamic Classes for Dark/Light Mode
    const theme = {
        bg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
        cardBg: isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100",
        textMain: isDarkMode ? "text-white" : "text-gray-900",
        textSub: isDarkMode ? "text-gray-400" : "text-gray-600",
        inputBg: isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900",
        missingContainer: isDarkMode ? "bg-red-900/20 border-red-800/50" : "bg-red-50 border-red-100",
        missingTitle: isDarkMode ? "text-red-400" : "text-red-800",
        missingItemBg: isDarkMode ? "bg-gray-700 border-red-800/30 text-white" : "bg-white border-red-100 text-gray-800"
    };

    return (
        // Added pt-24 to push content down below the fixed Navbar
        <div className={`min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300 ${theme.bg}`}>
            <div className="max-w-5xl mx-auto">
                
                {/* --- HEADER (Toggle Button Removed) --- */}
                <div className="text-center mb-10">
                    <h1 className={`text-4xl font-extrabold tracking-tight ${theme.textMain}`}>
                        AI Skill Gap <span className="text-blue-500">Analyzer</span>
                    </h1>
                    <p className={`mt-2 text-lg ${theme.textSub}`}>Analyze resumes against any job role.</p>
                </div>

                {/* --- INPUT CARD --- */}
                <div className={`rounded-2xl shadow-xl overflow-hidden mb-10 border p-8 transition-colors ${theme.cardBg}`}>
                    
                    <div className="flex justify-center mb-8">
                        <div className={`p-1 rounded-lg flex ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                            <button onClick={() => setMode("predefined")} className={`px-4 py-2 rounded-md text-sm font-medium transition ${mode === "predefined" ? "bg-blue-600 text-white shadow" : theme.textSub}`}>
                                Select Role
                            </button>
                            <button onClick={() => setMode("custom")} className={`px-4 py-2 rounded-md text-sm font-medium transition ${mode === "custom" ? "bg-blue-600 text-white shadow" : theme.textSub}`}>
                                Paste Job Description
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {/* LEFT: Inputs */}
                        <div>
                            {mode === "predefined" ? (
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme.textSub}`}>Target Role</label>
                                    <select 
                                        value={role} 
                                        onChange={(e) => setRole(e.target.value)}
                                        className={`block w-full px-4 py-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500 transition ${theme.inputBg}`}
                                    >
                                        <option>Full Stack Developer</option>
                                        <option>Frontend Developer</option>
                                        <option>Backend Developer</option>
                                        <option>Mobile App Developer</option>
                                        <option>Data Scientist</option>
                                        <option>DevOps Engineer</option>
                                        <option>Cybersecurity Analyst</option>
                                        <option>Cloud Engineer</option>
                                    </select>
                                </div>
                            ) : (
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${theme.textSub}`}>Paste Job Description</label>
                                    <textarea 
                                        rows="5"
                                        placeholder="Paste job requirements here..."
                                        value={jobDesc}
                                        onChange={(e) => setJobDesc(e.target.value)}
                                        className={`block w-full px-4 py-3 rounded-lg border focus:ring-blue-500 focus:border-blue-500 transition text-sm ${theme.inputBg}`}
                                    ></textarea>
                                </div>
                            )}
                        </div>

                        {/* RIGHT: File Upload */}
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme.textSub}`}>Upload Resume (PDF)</label>
                            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition ${isDarkMode ? "border-gray-600 hover:border-blue-400 bg-gray-700" : "border-gray-300 hover:border-blue-400 bg-gray-50"}`}>
                                <input 
                                    type="file" 
                                    accept=".pdf" 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleUpload} 
                        disabled={isLoading}
                        className={`mt-8 w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg text-lg font-medium text-white shadow-lg transition-all 
                            ${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1'}`}
                    >
                        {isLoading ? "Analyzing..." : <><UploadCloud className="mr-2"/> Analyze My Profile</>}
                    </button>
                </div>

                {/* --- RESULTS DASHBOARD --- */}
                {result && (
                    <div className="space-y-8 animate-fade-in-up">
                        
                        {/* ATS Score */}
                        <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 border border-gray-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10"><Cpu size={100} /></div>
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-blue-400 flex items-center"><FileText className="mr-2"/> ATS Score</h3>
                                    <ul className="mt-4 space-y-1">
                                        {result.atsFeedback.length > 0 ? result.atsFeedback.map((tip, i) => (
                                            <li key={i} className="text-sm text-yellow-200">• {tip}</li>
                                        )) : <li className="text-green-400">Perfect format!</li>}
                                    </ul>
                                </div>
                                <div className="text-6xl font-black text-green-400">{result.atsScore}</div>
                            </div>
                        </div>

                        {/* Chart & Lists */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className={`rounded-2xl shadow-lg p-6 flex justify-center ${theme.cardBg}`}>
                                <SkillChart currentSkills={result.currentSkills} missingSkills={result.missingSkills} isDarkMode={isDarkMode} />
                            </div>
                            
                            {/* Missing Skills */}
                            <div className={`rounded-2xl p-6 border ${theme.missingContainer}`}>
                                <h4 className={`flex items-center text-lg font-bold mb-4 ${theme.missingTitle}`}><AlertCircle className="w-5 h-5 mr-2"/> Missing Skills</h4>
                                <ul className="space-y-3">
                                    {result.missingSkills.map((skill, i) => (
                                        <li key={i} className={`p-3 rounded-lg shadow-sm border flex justify-between items-center ${theme.missingItemBg}`}>
                                            <span className="font-medium">{skill}</span>
                                            <a href={result.recommendedCourses[skill]} target="_blank" rel="noreferrer" className="flex items-center text-sm text-blue-500 hover:text-blue-400 font-semibold group">
                                                <BookOpen className="w-4 h-4 mr-1 group-hover:scale-110 transition"/> Learn
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* --- MOCK INTERVIEW BUTTON --- */}
<div className="flex justify-center mt-8 mb-8">
    <button 
        onClick={() => setShowInterview(true)}
        className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition font-bold text-lg"
    >
        <MessageCircle className="mr-2" /> Start Mock Interview 🎤
    </button>
    {/* --- MODAL --- */}
<InterviewModal 
    isOpen={showInterview} 
    onClose={() => setShowInterview(false)} 
    skills={result ? result.currentSkills : []} 
/>
</div>
                        {/* Roadmap */}
                        <div className="mt-12 mb-12">
                            <Roadmap missingSkills={result.missingSkills} isDarkMode={isDarkMode} />
                        </div>
                    </div>
                )}
                
                {/* --- HISTORY TABLE IS REMOVED (It is now in /pages/HistoryPage.jsx) --- */}

            </div>
        </div>
    );
};

export default UploadResume;