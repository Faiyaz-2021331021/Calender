import React, { useState } from "react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
    const [showProfile, setShowProfile] = useState(false);

    // Later you’ll fetch these from Firebase
    const student = {
        name: "John Doe",
        email: "john@example.com",
        courses: ["CSE101 - Intro to Programming", "CSE202 - Data Structures"],
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>🎓 Student Dashboard</h2>
                <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
                    Profile ⬇️
                </button>

                {showProfile && (
                    <div className="profile-dropdown">
                        <h3>{student.name}</h3>
                        <p>{student.email}</p>
                        <h4>Registered Courses:</h4>
                        <ul>
                            {student.courses.map((course, i) => (
                                <li key={i}>{course}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </header>

            <main className="dashboard-main">
                <h1>Welcome, {student.name.split(" ")[0]}!</h1>
                <p>This is your personal calendar dashboard.</p>
            </main>
        </div>
    );
}
