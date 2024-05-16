import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full">
      <div className="flex flex-shrink items-center justify-center">
        <img
          src={image.url}
          height={400}
          width="auto"
          alt="img"
          className="w-96 object-contain"
        />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l text-white">
        <div className="border-b p-2 text-center text-xl">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{uploaderInfo.fullName}</div>
        </div>
        <div className="p-2">
          <div>Created On:</div>
          <div>{image.createdAt.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
