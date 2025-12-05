import { connectToDatabase } from "~/lib/mongoDb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { db, client } = await connectToDatabase();
    await client.connect();

    const userPrefs = await db
      .collection("UserPreferences")
      .findOne({ userId });

    return NextResponse.json(userPrefs || {});
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return NextResponse.json(
      { error: "Failed to fetch preferences" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { preferences } = await req.json();
    const { db, client } = await connectToDatabase();
    await client.connect();

    const result = await db.collection("UserPreferences").updateOne(
      { userId },
      {
        $set: {
          preferences,
          userId,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json(
      { error: "Failed to save preferences" },
      { status: 500 },
    );
  }
}
export async function PUT(req) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { preferences } = await req.json();
    const { db, client } = await connectToDatabase();
    await client.connect();

    const result = await db.collection("UserPreferences").updateOne(
      { userId },
      {
        $set: {
          preferences,
          updatedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "User preferences not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return NextResponse.json(
      { error: "Failed to update preferences" },
      { status: 500 },
    );
  }
}
