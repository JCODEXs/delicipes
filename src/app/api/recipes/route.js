import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/mongoDb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
export async function POST(req, res) {
  const { userId } = auth();
  const body = await req.json();

  let { db, client } = await connectToDatabase();
  try {
    await client.connect();

    // Agregar información del creador
    const recipeWithMetadata = {
      ...body.recipe,
      createdBy: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await db
      .collection("VipRecipes")
      .insertOne(recipeWithMetadata);

    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
  } finally {
    // client.close();
  }
}
export async function GET(req, res) {
  let { db, client } = await connectToDatabase();
  const { searchParams } = new URL(req.url);

  const publicOnly = searchParams.get("publicOnly") === "true";

  // Debug logs
  console.log("Full URL:", req.url);
  console.log("Search params:", Object.fromEntries(searchParams.entries()));
  console.log("publicOnly value:", publicOnly);
  console.log("publicOnly type:", typeof publicOnly);
  try {
    // Filtrar solo recetas públicas si se especifica
    let filter = {};
    if (publicOnly) {
      // Buscar recetas que NO sean privadas (isPrivate: false, null, o undefined)
      filter = {
        $or: [
          { "recipe.isPrivate": false },
          { "recipe.isPrivate": { $exists: false } },
          { "recipe.isPrivate": null },
        ],
      };
    }
    // console.log("MongoDB filter:", JSON.stringify(filter));
    await client.connect();
    const result = await db.collection("VipRecipes").find(filter).toArray();
    console.log("thisresult", result);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
  } finally {
    // client.close();
  }
}
export async function PUT(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let { db, client } = await connectToDatabase();
  try {
    await client.connect();
    const { recipe } = await req.json();
    const { _id, ...rest } = recipe;

    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json(
        { message: "Invalid or missing ID format." },
        { status: 400 },
      );
    }

    // Verificar que la receta pertenece al usuario o es una copia
    const existingRecipe = await db
      .collection("VipRecipes")
      .findOne({ _id: new ObjectId(_id) });

    if (!existingRecipe) {
      return NextResponse.json(
        { message: "Recipe not found." },
        { status: 404 },
      );
    }

    // Solo permitir modificar si es el creador o si es una copia
    if (
      (console.log(existingRecipe, "existingRecipe"),
      console.log(userId, "userId"),
      console.log(existingRecipe.clonedFrom, "clonedFrom"),
      existingRecipe.createdBy !== userId && !existingRecipe.clonedFrom)
    ) {
      return NextResponse.json(
        { message: "You can only modify your own recipes or cloned recipes." },
        { status: 403 },
      );
    }

    const result = await db.collection("VipRecipes").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          recipe: {
            ...rest.recipe,
            updatedBy: userId,
            updatedAt: new Date().toISOString(),
          },
        },
      },
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({
        message: "Successfully updated the document.",
        result,
      });
    } else {
      return NextResponse.json(
        { message: "No document found with the given ID." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error updating the document:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the document." },
      { status: 500 },
    );
  } finally {
    // client.close();
  }
}

// export async function PUT(req) {
//   let { db, client } = await connectToDatabase();
//   try {
//     await client.connect();
//     const { recipe } = await req.json();
//     const { _id, ...rest } = recipe;
//     // console.log(_id, rest);
//     // Validate ID
//     if (!_id || !ObjectId.isValid(_id)) {
//       return NextResponse.json(
//         { message: "Invalid or missing ID format." },
//         { status: 400 },
//       );
//     }

//     // Update the recipe in the database
//     const result = await db
//       .collection("VipRecipes")
//       .updateOne({ _id: new ObjectId(_id) }, { $set: { recipe: rest.recipe } });

//     if (result.modifiedCount === 1) {
//       return NextResponse.json({
//         message: "Successfully updated the document.",
//         result,
//       });
//     } else {
//       return NextResponse.json(
//         { message: "No document found with the given ID." },
//         { status: 404 },
//       );
//     }
//   } catch (error) {
//     console.error("Error updating the document:", error);
//     return NextResponse.json(
//       { message: "An error occurred while updating the document." },
//       { status: 500 },
//     );
//   } finally {
//     // client.close();
//   }
// }
