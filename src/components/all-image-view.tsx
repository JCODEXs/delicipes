import { SignedIn, SignedOut } from "@clerk/nextjs";
// import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getAllImages } from "~/server/queries";
import { ImageType } from "~/types/types"; // Assuming you have a type definition for the images
import Dashboard from "./dashboard";

// export const dynamic = "force-dynamic";

type AllImagesPageProps = {
  images: ImageType[];
};

export const dynamic = "force-dynamic";

const AllImagesPage: React.FC<AllImagesPageProps> = async () => {
  const images = await getAllImages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Para comenzar inicia sesión
        </div>
      </SignedOut>
      <SignedIn>
        <Dashboard images={images} />
      </SignedIn>
    </main>
  );
};

export default AllImagesPage;
