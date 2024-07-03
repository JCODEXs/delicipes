import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "~/lib/mongoDb";
import { UTApi } from "uploadthing/server";
export const utapi = new UTApi();
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
  console.log(params);
  // Connect to the database
  let cached, db;
  cached = await connectToDatabase();
  db = cached.conn.db;

  try {
    const result = await db
      .collection("therecipes")
      .deleteOne({ _id: new ObjectId(params._id) });

    if (result.deletedCount === 1) {
      const deleteFiles = await utapi.deleteFiles(params.key);
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
