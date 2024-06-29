"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useSearchParams } from "next/navigation";
import { revalidatePath } from "next/cache";
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
    if (!dialogRef.current?.open && modal === "true") {
      dialogRef.current?.showModal();
    }
  }, []);
  // console.log(dialogRef);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute h-screen w-screen overflow-auto bg-black/90 pt-8"
      onClose={onDismiss}
    >
      {children}
      <button onClick={onDismiss} className="close-button text-white">
        x
      </button>
    </dialog>,
    document.getElementById("modal-root")!,
  );
}
