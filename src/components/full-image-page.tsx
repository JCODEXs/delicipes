import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImage } from "~/server/queries";
import { Button } from "./ui/button";
export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  const idAsNumber = Number(props.id);

  return (
    <div className="flex h-full w-full">
      <div className="flex w-96 flex-shrink items-center justify-center object-contain">
        <img src={image.url} height={400} width={"auto"} alt="img" />
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
        <div className="p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Eliminar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
