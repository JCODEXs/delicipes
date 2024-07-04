import { SignedIn, SignedOut } from "@clerk/nextjs";
import MealMatrix from "../_components/MealPlaning/mealMatrix";
import { getMyPrograms } from "~/store/pantry";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  const userId = await auth().userId;
  console.log("hi", userId);
  const myPrograms = await getMyPrograms(userId);
  console.log(myPrograms);
  return (
    <SignedIn>
      <MealMatrix myPrograms={myPrograms} />
    </SignedIn>
  );
}
