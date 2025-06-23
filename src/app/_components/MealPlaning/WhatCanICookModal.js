import React from "react";

export default function WhatCanICookModal({ open, onClose, recipes }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.25)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff8ed",
          borderRadius: 14,
          padding: "2rem",
          minWidth: 320,
          maxWidth: 480,
          boxShadow: "0 4px 18px rgba(120,70,30,0.13)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: "#a86b3c", marginBottom: 16 }}>You can cook:</h2>
        {recipes.length === 0 ? (
          <div style={{ color: "#a33" }}>
            No recipes found with your selection.
          </div>
        ) : (
          <ul>
            {recipes.map((r) => (
              <li key={r._id} style={{ marginBottom: 8, color: "#3a2412" }}>
                {r.recipe?.title || r.recipe?.tittle}
              </li>
            ))}
          </ul>
        )}
        <button
          style={{
            marginTop: 24,
            background: "#e7c08a",
            color: "#5a2d06",
            border: "none",
            borderRadius: 8,
            padding: "0.7rem 1.5rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
