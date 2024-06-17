import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import FullPageRecetionView from "~/components/reception-page";
import { getMyImages } from "~/server/queries";
import { CarouselComponent } from "./_components/carouselCompo";
export const dynamic = "force-dynamic";
async function Images() {
  return <CarouselComponent />;
}
//   const images = await getMyImages();

//   return (
//     <div className="flex flex-wrap justify-center gap-4 p-4">
//       {images.map((image) => (
//         <div key={image.id} className="flex h-48 w-48 flex-col">
//           <Link
//             key={image.id}
//             href={{ pathname: `/img/${image.id}`, query: { modal: "true" } }}
//             passHref
//             shallow
//           >
//             <Image
//               src={image.url}
//               style={{ objectFit: "contain" }}
//               width={192}
//               height={192}
//               alt={image.name}
//             />
//             <div>{image.name}</div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          <FullPageRecetionView />
          Sign in above to begin
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
