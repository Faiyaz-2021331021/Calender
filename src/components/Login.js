import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate();


  const signup = async () => {
    alert("Signed up successfully!");
    navigate(`/${role}-dashboard`);
  };
  // const signup = async () => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const uid = userCredential.user.uid;
  //
  //     await fetch("http://localhost:5000/signup", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email, password, role }),
  //     });
  //
  //     alert("Signed up successfully!");
  //     navigate(`/${role}-dashboard`);
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  // const login = async () => {
  //   try {
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const uid = userCredential.user.uid;
  //
  //     const res = await fetch("http://localhost:5000/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ uid }),
  //     });
  //     const data = await res.json();
  //     alert(`Logged in as ${data.role}`);
  //     navigate(`/${data.role}-dashboard`);
  //   } catch (err) {
  //     alert(err.message);
  //   }
  // };

  const login = async () => {
    navigate(`/${role}-dashboard`);
  };
  return (
      <div className="login-container">
        <div className="login-box">
          <h1 className="login-title">{role?.toUpperCase()} Portal</h1>
          <p className="login-subtitle">Sign up or log in to continue</p>

          {role !== "admin" && (
              <input
                  type="text"
                  className="login-input"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
          )}

          <input
              type="email"
              className="login-input"
              placeholder="University Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />

          <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          <div className="btn-group">
            <button className="btn signup" onClick={signup}>Sign Up</button>
            <button className="btn login" onClick={login}>Login</button>
          </div>
        </div>
      </div>
  );
}
