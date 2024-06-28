import { SignedIn, SignedOut } from "@clerk/nextjs";
import DesignRecipeMetods from "../_components/recipe design/recipeDesignMetods";

export const dynamic = "force-dynamic";
export default async function Recipes() {
  return (
    <SignedIn>
      <DesignRecipeMetods />
    </SignedIn>
  );
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
