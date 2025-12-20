
import { SignedIn, SignedOut } from "@clerk/nextjs";

import FullPageRecetionView from "~/components/reception-page";
import IngredientManager from "./clientPage";



export const dynamic = "force-dynamic";
export default async function IngredientsPage() {

  return (
    <div>
      <SignedIn>
     
     <IngredientManager />
        
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
