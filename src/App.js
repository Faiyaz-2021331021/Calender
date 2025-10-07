import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./components/RoleSelection";
import Login from "./components/Login";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoleSelection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
