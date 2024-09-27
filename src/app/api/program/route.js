import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "../../../lib/mongoDb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  // // console.log('req:', body);
  const userId = auth().userId;
  const newBody = { ...body, userId };
  let { db, client } = await connectToDatabase();
  try {
    await client.connect();
    // // console.log('rdb:', db)
    // case 'GET':
    //   // const asset = { id: req.body, files: await getFiles(req.body) };
    //   // res.status(404).json(asset);
    //   res
    //     .status(200)
    //     .json({ id: req.query.id, files: await getFiles(req.query.id) });
    //   break;

    const result = await db.collection("programs").insertOne(newBody);
    // // console.log(result);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
  }
  // res.status(404).json({});
}
export async function GET(req, context) {
  const userId = auth();
  // Adjust based on your params structure
  // // console.log(userId);
  // const userIdObject = new ObjectId(params._id);
  let { db, client } = await connectToDatabase();
  try {
    await client.connect();
    // Construct the query object
    const query = { userId: userId };

    const result = await db.collection("programs").find(query).toArray();
    // console.log(result);
    return NextResponse.json({ result });
  } catch (error) {
    console.log(error);
  }
}
