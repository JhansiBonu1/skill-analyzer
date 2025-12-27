import { CheckCircle } from 'lucide-react';

// We now accept 'isDarkMode' as a prop
const Roadmap = ({ missingSkills, isDarkMode }) => {
    if (!missingSkills || missingSkills.length === 0) return null;

    // Dynamic Themes for Roadmap
    const theme = {
        cardBg: isDarkMode ? "bg-gray-800 border-gray-700 shadow-xl" : "bg-white border-gray-200 shadow-lg",
        titleText: isDarkMode ? "text-white" : "text-gray-800",
        timelineLine: isDarkMode ? "border-blue-900" : "border-blue-100",
        dotsBg: isDarkMode ? "bg-gray-900" : "bg-white",
        itemCardBg: isDarkMode ? "bg-gray-700 border-gray-600 hover:shadow-md shadow-sm" : "bg-gray-50 border-gray-100 hover:shadow-md shadow-sm",
        itemTitle: isDarkMode ? "text-white" : "text-gray-800",
        itemSubText: isDarkMode ? "text-gray-400" : "text-gray-500",
        linkText: isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
    };

    return (
        <div className={`rounded-2xl p-6 border transition-colors duration-300 ${theme.cardBg}`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center ${theme.titleText}`}>
                🗺️ Personalized Learning Path
            </h3>
            
            {/* Timeline Container */}
            <div className={`relative border-l-4 ml-3 space-y-8 ${theme.timelineLine}`}>
                {missingSkills.map((skill, index) => (
                    <div key={index} className="relative pl-8">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-3.5 border-4 border-blue-500 rounded-full w-7 h-7 flex items-center justify-center transition-colors ${theme.dotsBg}`}>
                            <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        
                        {/* Content Card */}
                        <div className={`p-4 rounded-lg border transition-all ${theme.itemCardBg}`}>
                            <h4 className={`text-lg font-bold ${theme.itemTitle}`}>Learn {skill}</h4>
                            <p className={`text-sm mt-1 ${theme.itemSubText}`}>
                                Step {index + 1} of your journey to becoming a pro.
                            </p>
                            <a 
                                href={`https://www.google.com/search?q=free+course+${skill}`}
                                target="_blank" 
                                rel="noreferrer"
                                className={`inline-block mt-3 text-sm font-semibold ${theme.linkText}`}
                            >
                                Find Tutorials →
                            </a>
                        </div>
                    </div>
                ))}
                
                {/* Finish Line */}
                <div className="relative pl-8">
                    <div className="absolute -left-3.5 bg-green-500 border-4 border-green-200 rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
                        <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-green-500 font-bold mt-1 ml-2">
                        Job Ready!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roadmap;