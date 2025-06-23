export default function ActionBoxSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        padding: "1rem 0",
      }}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          style={{
            background: "#f3e9d7",
            borderRadius: 8,
            width: 120,
            height: 60,
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
              width: 60,
              height: 16,
              background: "#e7c08a",
              borderRadius: 4,
              marginBottom: 8,
            }}
          />
          <div
            style={{
              width: 40,
              height: 12,
              background: "#e7c08a",
              borderRadius: 4,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
