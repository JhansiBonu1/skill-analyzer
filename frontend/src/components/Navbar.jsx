import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, History, Home, LogIn } from 'lucide-react';

const Navbar = ({ isDarkMode, setIsDarkMode, isAuthenticated, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
        navigate("/login");
        setIsOpen(false);
    };

    // Dynamic Classes
    const theme = {
        nav: isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200",
        text: isDarkMode ? "text-white" : "text-gray-800",
        hover: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50",
        mobileMenu: isDarkMode ? "bg-gray-900" : "bg-white",
    };

    return (
        <nav className={`fixed top-0 w-full z-50 border-b transition-colors duration-300 ${theme.nav}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className={`text-2xl font-extrabold tracking-tighter ${theme.text}`}>
                            Skill<span className="text-blue-600">Gap</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={`flex items-center font-medium transition ${theme.text} hover:text-blue-500`}>
                            <Home className="w-4 h-4 mr-1"/> Home
                        </Link>
                        
                        {isAuthenticated && (
                            <Link to="/history" className={`flex items-center font-medium transition ${theme.text} hover:text-blue-500`}>
                                <History className="w-4 h-4 mr-1"/> History
                            </Link>
                        )}
                        
                        {/* Auth Buttons Logic */}
                        <div className="flex items-center space-x-3 ml-4">
                            {isAuthenticated ? (
                                <button 
                                    onClick={handleLogoutClick}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-2"/> Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                                        Login
                                    </Link>
                                    <Link to="/register" className={`px-4 py-2 text-sm font-medium border rounded-lg transition ${isDarkMode ? "border-gray-600 text-white hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Dark Mode Toggle */}
                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-full transition ${theme.hover} ${theme.text}`}
                        >
                            {isDarkMode ? "☀️" : "🌙"}
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsDarkMode(!isDarkMode)} className="mr-4 text-xl">
                            {isDarkMode ? "☀️" : "🌙"}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className={theme.text}>
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className={`md:hidden absolute w-full border-b shadow-xl ${theme.mobileMenu} border-gray-700`}>
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-3 rounded-md text-base font-medium ${theme.text} ${theme.hover}`}>
                            Home
                        </Link>
                        
                        {isAuthenticated && (
                            <Link to="/history" onClick={() => setIsOpen(false)} className={`block px-3 py-3 rounded-md text-base font-medium ${theme.text} ${theme.hover}`}>
                                History
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <button 
                                onClick={handleLogoutClick}
                                className="w-full text-left block px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)} className={`block px-3 py-3 rounded-md text-base font-medium ${theme.text} ${theme.hover}`}>
                                    Login
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className={`block px-3 py-3 rounded-md text-base font-medium ${theme.text} ${theme.hover}`}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;