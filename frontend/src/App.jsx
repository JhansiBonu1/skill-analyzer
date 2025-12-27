import { useState } from 'react'; // Removed useEffect since we don't need it for init anymore
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UploadResume from './components/UploadResume';
import HistoryPage from './pages/HistoryPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // FIX: Check localStorage immediately when the app starts
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token"); // Returns true if token exists, false if not
  });

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className={isDarkMode ? "dark" : ""}>
        {/* Pass auth state to Navbar */}
        <Navbar 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
        
        <Routes>
          <Route path="/" element={<UploadResume isDarkMode={isDarkMode} />} />
          <Route path="/history" element={<HistoryPage isDarkMode={isDarkMode} />} />
          
          {/* Pass setter to Login so it can update the state */}
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;