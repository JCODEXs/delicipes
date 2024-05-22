import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idasNumber = Number(photoId);

  return (
    <Modal>
      <FullPageImageView id={idasNumber} />
    </Modal>
  );
}
