import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, Timestamp } from "firebase/firestore";
import "./AdminDashboard.css";

function CreateEvent({ db }) {
    const [step, setStep] = useState(1);
    const [eventType, setEventType] = useState(null);
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleTypeSelect = (type) => {
        setEventType(type);
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!db) {
            setMessage({ text: "Database not connected.", type: "error" });
            return;
        }

        setLoading(true);
        setMessage({ text: "", type: "" });

        const eventDetails = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            targetAudience: eventType,
            createdAt: Timestamp.now(),
        };

        try {
            await addDoc(collection(db, "events"), eventDetails);
            setMessage({ text: `Event "${eventName}" created successfully!`, type: "success" });
            setStep(1);
            setEventType(null);
            setEventName("");
            setEventDate("");
            setEventTime("");
        } catch (err) {
            console.error("Firestore error:", err);
            setMessage({ text: "Failed to create event. Please try again.", type: "error" });
        } finally {
            setLoading(false);
            setTimeout(() => setMessage({ text: "", type: "" }), 4000);
        }
    };

    if (step === 1) {
        return (
            <div className="event-step">
                <h3>Step 1: Who is this event for?</h3>
                <div className="nav-buttons">
                    <button className="btn" onClick={() => handleTypeSelect("student")}>For Students</button>
                    <button className="btn" onClick={() => handleTypeSelect("teacher")}>For Teachers</button>
                    <button className="btn" onClick={() => handleTypeSelect("both")}>For Both</button>
                </div>
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="event-step">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>&larr; Back</button>
                <h3>Step 2: Event Details (For: {eventType})</h3>
                <form onSubmit={handleSubmit} className="event-form">
                    <input type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                    <input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} required />
                    <button className="btn" type="submit" disabled={loading}>{loading ? "Creating..." : "Create Event"}</button>
                    {message.text && <p className={`submit-message ${message.type}`}>{message.text}</p>}
                </form>
            </div>
        );
    }

    return null;
}

function SeeAllEvents({ db }) {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!db) return;

        const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            list.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
            setEvents(list);
            setLoading(false);
        }, (err) => {
            console.error(err);
            setError("Failed to load events.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db]);

    if (loading) return <div>Loading events...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="event-list-container">
            <h3>All Created Events</h3>
            {events.length === 0 ? <p>No events found.</p> : (
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
}

export default function AdminDashboard({ db }) {
    const [page, setPage] = useState("main");

    return (
        <div className="dashboard-container">
            <header className="dashboard-header"><h2>👑 Admin Dashboard</h2></header>
            <nav className="dashboard-nav">
                <button className="btn" onClick={() => setPage("main")}>Home</button>
                <button className="btn" onClick={() => setPage("create")}>Create Event</button>
                <button className="btn" onClick={() => setPage("see")}>See All Events</button>
            </nav>
            <main className="dashboard-main">
                {page === "create" && <CreateEvent db={db} />}
                {page === "see" && <SeeAllEvents db={db} />}
                {page === "main" && <p>Welcome! Select an action above.</p>}
            </main>
        </div>
    );
}
