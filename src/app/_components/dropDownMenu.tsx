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
        <DropdownMenuItem>Ingredient</DropdownMenuItem>
        <Link href={"/design"}>
          {" "}
          <DropdownMenuItem>Recipe</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Meal Program</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
