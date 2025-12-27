import { X, MessageCircle } from 'lucide-react';

const InterviewModal = ({ isOpen, onClose, skills }) => {
    if (!isOpen) return null;

    // Database of questions (Rule-Based)
    const questionBank = {
        "Java": ["Explain the difference between JDK, JRE, and JVM.", "What are the 4 pillars of OOPs?", "How does HashMap work internally?"],
        "React": ["What is the Virtual DOM?", "Explain the difference between State and Props.", "What are React Hooks?"],
        "Spring Boot": ["What is Dependency Injection?", "How do you handle exceptions in Spring Boot?", "Explain the @SpringBootApplication annotation."],
        "MySQL": ["What is the difference between TRUNCATE and DELETE?", "Explain Normalization.", "What are ACID properties?"],
        "Python": ["What are Python Decorators?", "Difference between List and Tuple.", "How is memory managed in Python?"],
        "Docker": ["What is a Docker Image vs Container?", "Explain Docker Compose.", "How do you optimize a Dockerfile?"]
    };

    // Pick 3 random questions based on skills found
    const generateQuestions = () => {
        let questions = [];
        skills.forEach(skill => {
            if (questionBank[skill]) {
                // Get a random question for this skill
                const randomQ = questionBank[skill][Math.floor(Math.random() * questionBank[skill].length)];
                questions.push({ skill, question: randomQ });
            }
        });
        // If we don't have enough specific questions, add generic ones
        while (questions.length < 3) {
            questions.push({ skill: "General", question: "Tell me about a challenging project you worked on." });
        }
        return questions.slice(0, 3); // Return top 3
    };

    const interviewQuestions = generateQuestions();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100">
                
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2 text-blue-500"/>
                        Mock Interview
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <X size={24}/>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Based on your resume, here are 3 questions an interviewer might ask you:
                    </p>
                    
                    {interviewQuestions.map((item, idx) => (
                        <div key={idx} className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-300 uppercase tracking-wide">
                                {item.skill} Question
                            </span>
                            <p className="mt-1 text-gray-800 dark:text-gray-100 font-medium">
                                "{item.question}"
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t dark:border-gray-700 text-right">
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    >
                        Close & Practice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewModal;