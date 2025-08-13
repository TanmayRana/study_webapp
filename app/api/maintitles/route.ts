import { connectDB } from "@/lib/mongodb";
import { MainTitle } from "@/lib/Schemas";
import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import MainTitle from "@/lib/models/MainTitle";

// GET all main titles
export async function GET() {
  try {
    await connectDB();
    const mainTitles = await MainTitle.find().populate("contents");
    return NextResponse.json(
      { success: true, data: mainTitles },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch main titles" },
      { status: 500 }
    );
  }
}

// POST / create new main title
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, contents } = body;

    // console.log();

    if (!title)
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );

    await connectDB();

    const mainTitle = await MainTitle.create({
      title,
      contents: contents || [],
    });

    return NextResponse.json(
      { success: true, data: mainTitle },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create main title" },
      { status: 500 }
    );
  }
}
