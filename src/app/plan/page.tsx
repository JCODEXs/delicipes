import { SignedIn, SignedOut } from "@clerk/nextjs";
import MealMatrix from "../_components/MealPlaning/mealMatrix";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  return (
    <SignedIn>
      <MealMatrix />
    </SignedIn>
  );
}
