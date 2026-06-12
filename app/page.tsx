"use client";

import { useState, useEffect, useRef, useCallback, createContext, useContext, useReducer } from "react";

export default function Page() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif", background: "#0a0a0a", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>Zalorix Global Trade</h1>
      <p style={{ color: "#888" }}>Deployment successful. Core engine is online.</p>
    </div>
  );
}