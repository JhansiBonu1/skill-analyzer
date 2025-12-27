import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Lock, Mail } from 'lucide-react';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", formData);
            
            // Save Token
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            
            // Update App State
            setIsAuthenticated(true);
            
            navigate("/"); // Go to Home
        } catch{
            setError("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex justify-center items-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-8">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to access your history</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="email" 
                                required 
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition" 
                                placeholder="you@example.com"
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input 
                                type="password" 
                                required 
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition" 
                                placeholder="••••••••"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;