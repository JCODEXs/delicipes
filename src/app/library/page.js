import { SignedIn, SignedOut } from "@clerk/nextjs";
import RecipeLibrary from "../_components/recipe design/RecipeLibrary";
import FullPageRecetionView from "~/components/reception-page";

export default async function LibraryPage() {
  return (
    <>
      <SignedIn>
        <RecipeLibrary />;
      </SignedIn>
      ;
      <SignedOut>
        <div className="h-full w-full rounded-md text-center text-2xl text-red-950">
          <FullPageRecetionView />
          <div className="m-2 bg-white p-2 text-3xl">
            Sign in above to begin
          </div>
        </div>
      </SignedOut>
    </>
  );
}
