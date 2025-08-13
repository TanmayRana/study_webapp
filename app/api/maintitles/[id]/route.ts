import { connectDB } from "@/lib/mongodb";
import { Content, MainTitle } from "@/lib/Schemas";
import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import MainTitle from "@/lib/models/MainTitle";
// import Content from "@/lib/models/Content";

// GET single MainTitle by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );

    await connectDB();
    const mainTitle = await MainTitle.findById(id).populate("contents");

    if (!mainTitle) {
      return NextResponse.json(
        { success: false, error: "Main title not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: mainTitle },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch main title" },
      { status: 500 }
    );
  }
}

// PUT / update MainTitle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, contents } = body;

    if (!id)
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );

    await connectDB();

    const updated = await MainTitle.findByIdAndUpdate(
      id,
      { title, contents },
      { new: true, runValidators: true }
    ).populate("contents");

    if (!updated)
      return NextResponse.json(
        { success: false, error: "Main title not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update main title" },
      { status: 500 }
    );
  }
}

// DELETE / delete MainTitle and related contents
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id)
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );

    await connectDB();

    const deleted = await MainTitle.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json(
        { success: false, error: "Main title not found" },
        { status: 404 }
      );

    // Cascade delete related contents
    await Content.deleteMany({ mainTitle: id });

    return NextResponse.json(
      {
        success: true,
        message: "Main title and related contents deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to delete main title" },
      { status: 500 }
    );
  }
}
