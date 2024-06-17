"use client";
import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SimpleAddButton } from "./simple-add-button";
import { Button } from "~/components/ui/button";

export default function Footer() {
  return (
    <nav>
      <div className="flex flex-row items-center gap-4">
        <SignedIn>
          <div className="flex w-full items-center justify-between border-b p-2 text-xl font-semibold">
            <div className="ml-2 flex w-full flex-row justify-between">
              <Link href={"/inventory"}>
                <div>Pantry</div>
              </Link>
              <Link href={"/plan"}>
                <div>Week plan</div>
              </Link>
              <Link href={"/design"}>
                <div>Recipes</div>
              </Link>
            </div>
            {/* <SimpleAddButton /> */}
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
