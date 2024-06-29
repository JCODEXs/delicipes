"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const status = useFormStatus();

  if (status.pending) {
    return <p> Creating Recipe...</p>;
  }

  return (
    <>
      <button>Add recipe to Library</button>
    </>
  );
}
