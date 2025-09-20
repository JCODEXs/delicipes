import { SignedIn, SignedOut } from "@clerk/nextjs";
import FullPageRecetionView from "~/components/reception-page";
import InstructionsContent from "../_components/instructions/InstructionsContent";

export const dynamic = "force-dynamic";

export default function InstructionsPage() {
  return (
    <div>
      <SignedIn>
        <InstructionsContent />
      </SignedIn>
      <SignedOut>
        <div className="h-full w-full rounded-md text-center text-2xl text-red-950">
          <FullPageRecetionView />
          <div className="text-5xl">Inicia sesión arriba para comenzar</div>
        </div>
      </SignedOut>
    </div>
  );
}
