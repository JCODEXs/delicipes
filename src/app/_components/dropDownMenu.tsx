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
          <DropdownMenuItem>Ingredientes</DropdownMenuItem>
        </Link>
        <Link href={"/design"}>
          {" "}
          <DropdownMenuItem>Receta</DropdownMenuItem>
        </Link>
        <Link href={"/plan"}>
          <DropdownMenuItem>Programar Comidas</DropdownMenuItem>
        </Link>
        <Link href={"/import"}>
          <DropdownMenuItem>Importar Datos</DropdownMenuItem>
        </Link>
        <Link href={"/manage_ingredients"}>
          <DropdownMenuItem>Gestionar Ingredientes</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={"/instructions"}>
          <DropdownMenuItem>📖 Guía de Uso</DropdownMenuItem>
        </Link>
        <Link href={"/settings"}>
  <DropdownMenuItem>⚙️ Configuración</DropdownMenuItem>
</Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
