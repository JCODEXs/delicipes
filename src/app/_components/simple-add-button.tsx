"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function AddSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      // stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

export function SimpleAddButton() {
  // const router = useRouter();

  return (
    <div>
      <label htmlFor="Add-button" className="cursor-pointer">
        <AddSVG />
      </label>
    </div>
  );
}
