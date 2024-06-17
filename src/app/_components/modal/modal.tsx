"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children, isOpen, onClose }) {
  const router = useRouter();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && !dialogRef.current?.open) {
      dialogRef.current?.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current?.close();
    }
  }, [isOpen]);
  // console.log(dialogRef);

  function onDismiss() {
    if (onClose) {
      onClose();
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(80, 80, 80, 0.91)",
        padding: " 1rem",
      }}
      onClose={onDismiss}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginInline: "3rem",
        }}
      >
        <button onClick={onDismiss} className="ModalButton">
          Close
        </button>
      </div>
      {children}
    </dialog>,
    document.getElementById("modal-root"),
  );
}
