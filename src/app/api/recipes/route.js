import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/mongoDb";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  const body = await req.json();
  console.log("req:", body);

  const cached = await connectToDatabase();
  const db = cached.conn.db;

  // console.log('rdb:', db)
  // case 'GET':
  //   // const asset = { id: req.body, files: await getFiles(req.body) };
  //   // res.status(404).json(asset);
  //   res
  //     .status(200)
  //     .json({ id: req.query.id, files: await getFiles(req.query.id) });
  //   break;

  const result = await db.collection("therecipes").insertOne(body.recipe);
  //    console.log(result);
  return NextResponse.json({ result });
}
export async function GET(req, res) {
  // console.log("hi");
  const cached = await connectToDatabase();
  const db = cached.conn.db;

  const result = await db.collection("therecipes").find().toArray();
  // console.log(result);
  return NextResponse.json({ result });
}

export async function PUT(req) {
  const cached = await connectToDatabase();
  const db = cached.conn.db;
  try {
    const { recipe } = await req.json();
    const { _id, ...rest } = recipe;
    // console.log(_id, rest);
    // Validate ID
    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json(
        { message: "Invalid or missing ID format." },
        { status: 400 },
      );
    }

    // Update the recipe in the database
    const result = await db
      .collection("therecipes")
      .updateOne({ _id: new ObjectId(_id) }, { $set: { recipe: rest.recipe } });

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
  }
}
