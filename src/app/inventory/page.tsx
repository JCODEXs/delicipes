import { SignedIn, SignedOut } from "@clerk/nextjs";
import ShopingList from "../_components/MealPlaning/shopingList";
import { auth } from "@clerk/nextjs/server";
import { getMyPrograms, getRecipes } from "~/store/pantry";
import FullPageRecetionView from "~/components/reception-page";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  const userId = await auth().userId;
  // console.log("hi", userId);
  const myPrograms = await getMyPrograms(userId);
  const allRecipes = await getRecipes()
  console.log(allRecipes, "allRecipespage");
  return (
    <div>
      <SignedIn>
        {/* <div>Inventario</div> */}
        <ShopingList myPrograms={myPrograms} allRecipes={allRecipes}/>
      </SignedIn>
      <SignedOut>
        <div className="h-full w-full rounded-md text-center text-2xl text-red-950">
          <FullPageRecetionView />
          <div className="text-5xl">Sign in above to begin</div>
        </div>
      </SignedOut>
    </div>
  );
}
