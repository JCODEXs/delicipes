import { connectToDatabase } from "../../../lib/mongoDb";
import { NextResponse } from "next/server";
export async function POST(req, res) {
  const body = await req.json();
  // console.log('req:', body);

  let { db, client } = await connectToDatabase();

  // console.log('rdb:', db)
  // case 'GET':
  //   // const asset = { id: req.body, files: await getFiles(req.body) };
  //   // res.status(404).json(asset);
  //   res
  //     .status(200)
  //     .json({ id: req.query.id, files: await getFiles(req.query.id) });
  //   break;
  let result;
  try {
    await client.connect();
    result = await client
      .db("Delicipes")
      .collection("ingredients")
      .insertOne(body);
    // console.log(result);
  } catch (error) {
    console.error("Error posting the document:", error);
    return NextResponse.json(
      { message: "An error occurred while posting the document." },
      { status: 500 },
    );
  }
  // console.log("hi");
  return NextResponse.json({ result });
}
export async function GET(req, res) {
  let { db, client } = await connectToDatabase();
  try {
    await client.connect();
    const result = await db.collection("ingredients").find().toArray();
    // console.log(result);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error getting the document:", error);
    return NextResponse.json(
      { message: "An error occurred while getting the document." },
      { status: 500 },
    );
  } finally {
    // client.close();
    // client = null; // Reset cached client after closing
    // db = null;
  }

  // res.status(404).json({});
}
