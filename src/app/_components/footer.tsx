"use client";
import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { SimpleAddButton } from "./simple-add-button";
import { Button } from "~/components/ui/button";

export default function Footer() {
  return (
    <nav className="w-full overflow-x-hidden">
      <div className="flex flex-row flex-wrap items-center justify-center gap-1 bg-slate-900 text-[1.25rem] md:text-[1.35rem] w-full">
        <SignedIn>
          <div className="flex w-full max-w-xl flex-row flex-wrap justify-between text-white mx-auto px-2 py-1 font-semibold">
            <Link
              href={"/inventory"}
              className="text-white hover:text-yellow-200 font-medium px-1 md:px-2 whitespace-nowrap"
            >
              Pantry
            </Link>
            <Link
              href={"/plan"}
              className="text-white hover:text-yellow-200 font-medium px-1 md:px-2 whitespace-nowrap"
            >
              Week plan
            </Link>
            <Link
              href={"/design"}
              className="text-white hover:text-yellow-200 font-medium px-1 md:px-2 whitespace-nowrap"
            >
              New Recipe
            </Link>
            <Link
              href="/library"
              className="text-white hover:text-yellow-200 font-medium px-1 md:px-2 whitespace-nowrap"
            >
              Library
            </Link>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
