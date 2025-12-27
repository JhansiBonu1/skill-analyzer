import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock } from 'lucide-react';

const HistoryPage = ({ isDarkMode }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem("username");
        
        if (username) {
            axios.get(`http://localhost:8080/api/resume/history?username=${username}`)
                .then(res => setHistory(res.data))
                .catch(err => console.error(err));
        }
    }, []);

    const theme = {
        bg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
        card: isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        textMain: isDarkMode ? "text-white" : "text-gray-900",
        textSub: isDarkMode ? "text-gray-400" : "text-gray-600",
        rowHover: isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
    };

    return (
        <div className={`min-h-screen pt-24 px-4 ${theme.bg}`}>
            <div className={`max-w-4xl mx-auto rounded-2xl shadow-xl overflow-hidden border ${theme.card}`}>
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <Clock className={`w-5 h-5 mr-2 ${theme.textSub}`}/>
                    <h2 className={`text-xl font-bold ${theme.textMain}`}>Your Upload History</h2>
                </div>
                
                <div className="p-0 overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead className={isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-500"}>
                            <tr>
                                <th className="p-4 font-semibold">ID</th>
                                <th className="p-4 font-semibold">Role</th>
                                <th className="p-4 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDarkMode ? "divide-gray-700" : "divide-gray-100"}`}>
                            {history.map((item) => (
                                <tr key={item.id} className={`transition ${theme.rowHover}`}>
                                    <td className={`p-4 ${theme.textSub}`}>#{item.id}</td>
                                    <td className={`p-4 font-medium ${theme.textMain}`}>{item.targetRole}</td>
                                    <td className={`p-4 ${theme.textSub}`}>
                                        {item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : "Just now"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;