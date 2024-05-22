import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";

export default async function PhotoModal({
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
