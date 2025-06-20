export default function Skeleton() {
  return (
    <section className="ReceipLibrary" style={{ marginTop: "2rem" }}>
      <div
        style={{
          fontSize: "1.5rem",
          margin: "1rem 0",
          fontWeight: 700,
          background: "#fff",
          borderRadius: 8,
          padding: "0.5rem 1rem",
          boxShadow: "0 1px 4px rgba(200,180,120,0.08)",
        }}
      >
        Loading Recipes...
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              background: "#f9f6ea",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              minWidth: 180,
              minHeight: 120,
              boxShadow: "0 1px 4px rgba(200,180,120,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.7,
              animation: "pulse 1.5s infinite",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: "#e7c08a",
                borderRadius: 6,
                marginBottom: 12,
              }}
            />
            <div
              style={{
                width: 100,
                height: 18,
                background: "#e7c08a",
                borderRadius: 4,
                marginBottom: 6,
              }}
            />
            <div
              style={{
                width: 60,
                height: 14,
                background: "#e7c08a",
                borderRadius: 4,
              }}
            />
          </div>
        ))}
      </div>
      <style>{`
          @keyframes pulse {
            0% { opacity: 0.7; }
            50% { opacity: 1; }
            100% { opacity: 0.7; }
          }
        `}</style>
    </section>
  );
}
