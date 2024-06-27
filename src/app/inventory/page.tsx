import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
export default async function MealPlan() {
  return (
    <SignedIn>
      <div>Inventario</div>
    </SignedIn>
  );
}
