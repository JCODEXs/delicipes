import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "~/lib/mongoDb";

export async function DELETE(req, context) {
  // Extract the ID from the URL params
  const { params } = context;
  console.log(params);
  // Ensure the ID is valid
  if (!params._id || !ObjectId.isValid(params._id)) {
    return NextResponse.json(
      { message: "Invalid or missing ID format." },
      { status: 400 },
    );
  }
  // console.log(params);
  // Connect to the database

  let { db, client } = await connectToDatabase();

  try {
    await client.connect();
    const result = await db
      .collection("ingredients")
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
  } finally {
    // Optional: Close the client connection if needed (like in non-serverless environments)
    await client.close();
    client = null; // Reset cached client after closing
    db = null;
  }
}
