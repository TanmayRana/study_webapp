import { connectDB } from "@/lib/mongodb";
import { Content, MainTitle } from "@/lib/Schemas";
import { NextResponse } from "next/server";
// import dbConnect from "@/lib/dbConnect";
// import Content from "@/lib/models/content";

export async function GET() {
  await connectDB();
  const contents = await Content.find().populate("mainTitle");
  return NextResponse.json({ success: true, data: contents });
}

export async function POST(req: Request) {
  await connectDB();
  const { title, content, mainTitle } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { success: false, error: "Title and content are required" },
      { status: 400 }
    );
  }

  const newContent = await Content.create({ title, content, mainTitle });

  await MainTitle.findByIdAndUpdate(
    mainTitle,
    { $push: { contents: newContent._id } },
    { new: true }
  );

  return NextResponse.json({ success: true, data: newContent });
}
