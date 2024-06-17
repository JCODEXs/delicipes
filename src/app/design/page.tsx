import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { getMyImages } from "~/server/queries";
import DesignRecipe from "../_components/recipe design/recepiDesign";

export const dynamic = "force-dynamic";
export default async function Recipes() {
  return <DesignRecipe />;
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
