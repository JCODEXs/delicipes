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

  function onDismiss() {
    if (onClose) {
      onClose();
    }
  }

  // Close modal when clicking outside the content
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleClick(event) {
      // Only close if click is on the <dialog> backdrop, not inside the modal content
      if (event.target === dialog) {
        onDismiss();
      }
    }

    dialog.addEventListener("click", handleClick);
    return () => dialog.removeEventListener("click", handleClick);
  }, [onClose]);

  return createPortal(
    <dialog
      ref={dialogRef}
      style={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(80, 80, 80, 0.91)",
        padding: "1rem",
      }}
      onClose={onDismiss}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginInline: "2rem",
          marginTop:"2rem"
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
