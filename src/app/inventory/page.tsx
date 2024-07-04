import { SignedIn, SignedOut } from "@clerk/nextjs";
import ShopingList from "../_components/MealPlaning/shopingList";
import { auth } from "@clerk/nextjs/server";
import { getMyPrograms } from "~/store/pantry";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  const userId = await auth().userId;
  // console.log("hi", userId);
  const myPrograms = await getMyPrograms(userId);
  return (
    <SignedIn>
      {/* <div>Inventario</div> */}
      <ShopingList myPrograms={myPrograms} />
    </SignedIn>
  );
}
