"use client";
import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SimpleAddButton } from "./simple-add-button";
import { Button } from "~/components/ui/button";

export default function Footer() {
  return (
    <nav>
      <div className="flex flex-row items-center gap-4 bg-slate-900">
        <SignedIn>
          <div className="flex w-full items-center justify-between border-b p-2 text-xl font-semibold">
            <div className="ml-2 flex w-full flex-row justify-around text-white">
              <Link href={"/inventory"}
               className="text-white hover:text-yellow-200 text-lg font-medium">
                <div>Pantry</div>
              </Link>
              <Link href={"/plan"}
               className="text-white hover:text-yellow-200 text-lg font-medium">
                <div>Week plan</div>
              </Link>
              <Link href={"/design"}
               className="text-white hover:text-yellow-200 text-lg font-medium">
                <div> New Recipe</div>
              </Link>
               <Link
                        href="/library"
                        className="text-white hover:text-yellow-200 text-lg font-medium"
                      >
                        Library
                      </Link>
            </div>
            {/* <SimpleAddButton /> */}
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
