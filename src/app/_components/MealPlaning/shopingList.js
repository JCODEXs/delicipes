"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "../../../components/ui/table";
import { useEffect, useState } from "react";
export default function ShopingList({ myPrograms }) {
  const index = myPrograms ? myPrograms.length - 1 : 0;
  const lastProgram = myPrograms?.[index]?._program?.ingredientsTotList?.[0];
  console.log(index, lastProgram);
  const [RecipeList, setRecipeList] = useState(lastProgram);
  let total = 0;

  // console.log(RecipeList);
  return (
    <Table
      style={{
        fontSize: "1.2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <TableCaption>Your week shoping list.</TableCaption>
      <TableHeader>
        <TableRow style={{ gap: "1rem" }}>
          <TableHead className="w-[100px]">Ingredient</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {RecipeList &&
          Object.entries(RecipeList).map(([ingredient, details], index) => {
            // console.log(details);
            total += details.precio;
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{ingredient}</TableCell>
                <TableCell>{details.cantidad.toFixed(0)}</TableCell>
                <TableCell>0</TableCell>
                <TableCell className="text-right">
                  {details.precio.toFixed(0)}
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">${total.toFixed(0)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
