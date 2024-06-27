import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { SimpleAddButton } from "./simple-add-button";
export function DropdownMenuAdd() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <SimpleAddButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/ingredients"}>
          <DropdownMenuItem>Ingredient</DropdownMenuItem>
        </Link>
        <Link href={"/design"}>
          {" "}
          <DropdownMenuItem>Recipe</DropdownMenuItem>
        </Link>
        <Link href={"/plan"}>
          <DropdownMenuItem>Meal Program</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
