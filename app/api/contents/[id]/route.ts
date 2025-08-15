// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { connectDB } from "@/lib/mongodb";
// import { Content } from "@/lib/Schemas";
// import { NextResponse } from "next/server";

// // /api/contents/[contentId]
// export async function GET(
//   request: Request,
//   { params }: { params: { contentId: string } }
// ) {
//   const { contentId } = await params;
//   console.log("params in GET contentId", contentId);

//   await connectDB();

//   try {
//     const content = await Content.findById(contentId);

//     if (!content) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: content });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   req: Request,
//   { params }: { params: { contentId: string } }
// ) {
//   await connectDB();
//   const { title, content, mainTitle } = await req.json();

//   try {
//     const updated = await Content.findByIdAndUpdate(
//       params.contentId,
//       { title, content, mainTitle },
//       { new: true }
//     );

//     if (!updated) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: updated });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   _: Request,
//   { params }: { params: { contentId: string } }
// ) {
//   await connectDB();

//   try {
//     const deleted = await Content.findByIdAndDelete(params.contentId);

//     if (!deleted) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { connectDB } from "@/lib/mongodb";
// import { Content } from "@/lib/Schemas";
// import { NextResponse } from "next/server";

// // GET content by contentId
// export async function GET(
//   req: Request,
//   { params }: { params: { contentId: string } }
// ) {
//   const { contentId } = params;
//   console.log("params in GET contentId", contentId);

//   await connectDB();

//   try {
//     const content = await Content.findById(contentId);

//     if (!content) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: content });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// // PUT update content by contentId
// export async function PUT(
//   req: Request,
//   { params }: { params: { contentId: string } }
// ) {
//   const { contentId } = params;
//   await connectDB();

//   try {
//     const { title, content, mainTitle } = await req.json();

//     const updated = await Content.findByIdAndUpdate(
//       contentId,
//       { title, content, mainTitle },
//       { new: true }
//     );

//     if (!updated) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: updated });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

// // DELETE content by contentId
// export async function DELETE(
//   _: Request,
//   { params }: { params: { contentId: string } }
// ) {
//   const { contentId } = params;
//   await connectDB();

//   try {
//     const deleted = await Content.findByIdAndDelete(contentId);

//     if (!deleted) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";
import { Content, MainTitle } from "@/lib/Schemas";
import { NextResponse } from "next/server";

// GET content by ID
// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params;

//   console.log("params in GET id", id);

//   await connectDB();

//   try {
//     const content = await Content.findById(id);

//     if (!content) {
//       return NextResponse.json(
//         { success: false, error: "Content not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: content });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log("params in GET id", id);

  await connectDB();

  try {
    const content = await Content.findById(id);

    if (!content) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: content });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// PUT update content by ID
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();

  try {
    const { title, content, mainTitle } = await req.json();

    // console.log("body", title, content, mainTitle);

    const exisContent = await Content.findById(id);

    if (exisContent.mainTitle.toString() !== mainTitle) {
      await MainTitle.findByIdAndUpdate(exisContent.mainTitle, {
        $pull: { contents: id },
      });
    }

    const updated = await Content.findByIdAndUpdate(
      id,
      { $set: { title, content, mainTitle } },
      { new: true }
    );
    await MainTitle.findByIdAndUpdate(mainTitle, {
      $push: { contents: id },
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE content by ID
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await connectDB();

  try {
    const deleted = await Content.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Content not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
