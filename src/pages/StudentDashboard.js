import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import "./StudentDashboard.css"; // create a simple CSS file

export default function StudentDashboard({ db }) {
    const [showProfile, setShowProfile] = useState(false);
    const [page, setPage] = useState("dashboard"); // 'dashboard', 'view', 'register', 'calendar', 'events'
    const [events, setEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    // Mock student info (later fetch from Firebase Auth / Firestore)
    const student = {
        name: "John Doe",
        email: "john@example.com",
        courses: ["CSE101 - Intro to Programming", "CSE202 - Data Structures"],
    };

    // Fetch events visible to students
    useEffect(() => {
        if (!db) return;

        setLoadingEvents(true);
        const unsubscribe = onSnapshot(
            collection(db, "events"),
            (snapshot) => {
                const allEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Only events for student or both
                const studentEvents = allEvents.filter(ev => ev.targetAudience === "student" || ev.targetAudience === "both");
                // Sort by createdAt
                studentEvents.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
                setEvents(studentEvents);
                setLoadingEvents(false);
            },
            (err) => {
                console.error("Error fetching events:", err);
                setLoadingEvents(false);
            }
        );

        return () => unsubscribe();
    }, [db]);

    const renderPage = () => {
        switch (page) {
            case "view":
                return (
                    <div>
                        <h3>Registered Courses</h3>
                        <ul>
                            {student.courses.map((course, i) => <li key={i}>{course}</li>)}
                        </ul>
                    </div>
                );

            case "register":
                return <p>Register for new courses (Coming soon)</p>;

            case "calendar":
                return <p>View calendar (Coming soon)</p>;

            case "events":
                return (
                    <div>
                        <h3>Events for You</h3>
                        {loadingEvents ? (
                            <p>Loading events...</p>
                        ) : events.length === 0 ? (
                            <p>No events available</p>
                        ) : (
                            <ul>
                                {events.map(ev => (
                                    <li key={ev.id}>
                                        <strong>{ev.name}</strong> - {ev.date} at {ev.time} | For: {ev.targetAudience}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                );

            case "dashboard":
            default:
                return (
                    <div>
                        <h1>Welcome, {student.name.split(" ")[0]}!</h1>
                        <p>This is your personal student dashboard.</p>
                    </div>
                );
        }
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
                            {student.courses.map((course, i) => <li key={i}>{course}</li>)}
                        </ul>
                    </div>
                )}
            </header>

            <main className="dashboard-main">
                <div className="student-nav">
                    <button onClick={() => setPage("dashboard")}>Dashboard Home</button>
                    <button onClick={() => setPage("view")}>View Courses</button>
                    <button onClick={() => setPage("register")}>Register Course</button>
                    <button onClick={() => setPage("calendar")}>View Calendar</button>
                    <button onClick={() => setPage("events")}>View Events</button>
                </div>
                <hr />
                {renderPage()}
            </main>
        </div>
    );
}
