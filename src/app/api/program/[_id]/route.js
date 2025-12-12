import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "~/lib/mongoDb";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req, context) {
  // Extract the ID from the URL params
  const { params } = context;
  // console.log(params);
  // Ensure the ID is valid
  if (!params._id || !ObjectId.isValid(params._id)) {
    return NextResponse.json(
      { message: "Invalid or missing ID format." },
      { status: 400 },
    );
  }
  // // console.log(params);
  // Connect to the database
  let { db, client } = await connectToDatabase();

  try {
    await client.connect();
    const result = await db
      .collection("module")
      .deleteOne({ _id: new ObjectId(params._id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({
        message: "Successfully deleted the document.",
      });
    } else {
      return NextResponse.json(
        { message: "No document found with the given ID." },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error deleting the document:", error);
    return NextResponse.json(
      { message: "An error occurred while deleting the document." },
      { status: 500 },
    );
  }
}

export async function GET(req, context) {
  const { userId } = await auth();
  const { params } = context;
  const programId = params._id;
  console.log(userId, "userId", context.params._id, programId);
  // if (userId !== programId) return forbidden;

  const { db, client } = await connectToDatabase();

  try {
    await client.connect();
    if (!userId) {
      return NextResponse.json({ result: [] }, { status: 200 });
    }

    const query = { userId };
    console.log(query, "query");

    const result = await db.collection("programs").find(query).toArray();
    // console.log(result[result.length - 1].selectedRecipes, "result");

    // If nothing found, return empty array
    if (!result || result.length === 0) {
      return NextResponse.json({ result: [] }, { status: 200 });
    }

    // Otherwise return the found documents
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
