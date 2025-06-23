export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  recipeTitle,
  children,
  pendingDeleteType,
  pendingDelete,
}) {
  if (!isOpen) return null;
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
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: "2rem",
          minWidth: 280,
          boxShadow: "0 4px 24px rgba(42, 30, 30, 0.82)",
          textAlign: "center",
        }}
      >
        {pendingDeleteType === "recipe" && (
          <div style={{ marginBottom: 16, fontWeight: 600, color: "#23262e" }}>
            Delete recipe{" "}
            <span style={{ color: "#b91c1c", fontWeight: 700 }}>
              {recipeTitle}
            </span>
            ?
          </div>
        )}
        <div style={{ color: "#23262e", marginBottom: 16 }}>{children}</div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              background: "#b91c1c",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            style={{
              background: "#23262e",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
