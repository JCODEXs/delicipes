import { SignedIn, SignedOut } from "@clerk/nextjs";
import api from "./api/recipes/api";
import FullPageRecetionView from "~/components/reception-page";
import { CarouselComponent } from "./_components/carouselCompo";
import { getIngredients, getRecipes, usePantry } from "~/store/pantry";

import DataStorage from "./dataStorage";
export const dynamic = "force-dynamic";

async function ImagesCarrousel() {
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

const fetchData = async (retries = 2) => {
  let recipes;
  let ingredients;
  try {
    setTimeout(() => {
      console.log("hello");
    }, 2000);
    recipes = await getRecipes();
    ingredients = await getIngredients();

    return { recipes, ingredients };
  } catch (err) {
    if (retries > 0) {
      console.log("1");
      setTimeout(() => fetchData(retries - 1), 2000); // Retry after 2 seconds
    } else {
      console.error("Error fetching data:", err);
    }
  }
  return { recipes, ingredients };
};

export default async function HomePage() {
  try {
    // const recipes = await getRecipes();
    // const ingredients = await getIngredients();
    // const { recipes, ingredients } = fetchData();
    const [recipesResponse, ingredientsResponse] = await Promise.all([
      api.get("/recipes"),
      api.get("/ingredients"),
    ]);
    const recipes = recipesResponse.data.result;
    const ingredients = ingredientsResponse.data.result;

    return (
      <main className="flex min-h-screen flex-col items-center justify-center  text-white">
        <SignedOut>
          <div className="h-full w-full rounded-md text-center text-2xl text-red-950">
            <FullPageRecetionView />
            <div className="text-5xl">Sign in above to begin</div>
          </div>
        </SignedOut>
        <SignedIn>
          <ImagesCarrousel />
          <DataStorage recipes={recipes} ingredients={ingredients} />
        </SignedIn>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center text-white">
        {/* <p>Error fetching data. Please try again later.</p> */}
        <div className="h-full w-full text-center text-2xl">
          <FullPageRecetionView />
          Sign in above to begin
        </div>
      </main>
      // <main className="flex min-h-screen flex-col items-center justify-center  text-white">
      //   <SignedOut>
      //     <div className="h-full w-full text-center text-2xl">
      //       <FullPageRecetionView />
      //       Sign in above to begin
      //     </div>
      //   </SignedOut>
      //   <SignedIn>
      //     <Images />
      //   </SignedIn>
      // </main>
    );
  }
}
