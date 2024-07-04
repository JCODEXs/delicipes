import { SignedIn, SignedOut } from "@clerk/nextjs";
import ShopingList from "../_components/MealPlaning/shopingList";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  const RecipeList = [];
  return (
    <SignedIn>
      <div>Inventario</div>
      <ShopingList RecipeList={RecipeList} />
    </SignedIn>
  );
}
