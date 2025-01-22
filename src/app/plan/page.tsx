import { SignedIn, SignedOut } from "@clerk/nextjs";
import MealMatrix from "../_components/MealPlaning/mealMatrix";
import { getMyPrograms } from "~/store/pantry";
import { auth } from "@clerk/nextjs/server";
import FullPageRecetionView from "~/components/reception-page";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  const userId = await auth().userId;
  // console.log("hi", userId);
  const myPrograms = await getMyPrograms(userId);
  // console.log(myPrograms);
  return (
    <div>
      <SignedIn>
        <MealMatrix myPrograms={myPrograms} />
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
