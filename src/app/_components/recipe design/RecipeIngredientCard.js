import React from "react";

export default function RecipeIngredientCard({
  item,
  index,
  quantity,
  removeItem,
  increase,
  decrease,
}) {
  const emoji = item?.ingredient?.image || "🍴";

  return (
    <div style={{ position: "relative", width: 157, margin: "0 auto" }}>
      {/* Remove button outside the circle, top right */}
      <button
        style={{
          position: "absolute",
          top: -14,
          right: 0,
          background: "#fff0f0",
          border: "none",
          color: "#c22",
          fontWeight: "bold",
          fontSize: "1.2rem",
          cursor: "pointer",
          borderRadius: "50%",
          width: 32,
          height: 32,
          lineHeight: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 1px 4px rgba(200,180,120,0.13)",
          zIndex: 10,
        }}
        onClick={() => removeItem(item, index)}
        title="Remove ingredient"
      >
        ×
      </button>
      {/* Ingredient circle card */}
      <div
        style={{
          width: 137,
          height: 137,
          borderRadius: "50%",
          background: "#f9f6ea",
          boxShadow: "0 1px 8px rgba(200,180,120,0.13)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Emoji as background */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: "5rem",
            opacity: 0.93,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 1,
          }}
        >
          {emoji}
        </span>
        {/* Info overlay */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "90%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.72)",
            borderRadius: "50%",
            padding: "0.5rem",
          }}
        >
          <div
            style={{
              fontWeight: 500,
              fontSize: "1rem",
              marginBottom: 2,
              color: "#3a2412",
              textAlign: "center",
            }}
          >
            {item?.ingredient?.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 2,
            }}
          >
            <button
              className="buttonSum"
              style={{
                background: "#e7c08a",
                color: "#5a2d06",
                border: "none",
                borderRadius: "50%",
                width: 26,
                height: 26,
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(200,180,120,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => increase(index, item?.ingredient?.units)}
            >
              +
            </button>
            <div style={{ minWidth: 28, textAlign: "center" }}>
              <div
                style={{
                  minWidth: 28,
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#3a2412",
                }}
              >
                {quantity?.[index]}
              </div>
              <div>{item?.ingredient?.units}</div>
            </div>
            <button
              className="buttonSum"
              style={{
                background: "#fff0f0",
                color: "#a33",
                border: "none",
                borderRadius: "50%",
                width: 26,
                height: 26,
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(200,180,120,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => decrease(index, item?.ingredient?.units)}
            >
              –
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
