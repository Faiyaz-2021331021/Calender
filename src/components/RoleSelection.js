import React from "react";
import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to University Calendar</h1>
      <h3>Join as:</h3>
      <button onClick={() => goToLogin("student")}>Student</button>
      <button onClick={() => goToLogin("teacher")}>Teacher</button>
      <button onClick={() => goToLogin("admin")}>Admin</button>
    </div>
  );
}
