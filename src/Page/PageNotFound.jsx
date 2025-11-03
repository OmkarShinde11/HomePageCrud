import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9fa",
        textAlign: "center",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "6rem", marginBottom: "1rem", color: "#e63946" }}>
        404
      </h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }} className="text-amber-500">
        Oops! Page not found
      </h2>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }} className="text-amber-500">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/home")}
        style={{
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
        className="bg-amber-500"
      >
        Go Home
      </button>
    </div>
  );
}
