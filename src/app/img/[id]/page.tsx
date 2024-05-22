import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idasNumber = Number(photoId);

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 overflow-y-hidden">
      <FullPageImageView id={idasNumber} />;
    </div>
  );
}
