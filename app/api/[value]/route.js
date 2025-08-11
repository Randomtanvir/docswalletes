import connectMongo from "@/db/db";
import { VerificationModel } from "@/models/verification.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectMongo();
    const { value } = params;

    let query = null;

    // Check if it's a valid Mongo ObjectId
    if (mongoose.Types.ObjectId.isValid(value)) {
      query = { _id: value };
    }
    // Check if it's a number (for urlNumber)
    else if (!isNaN(value)) {
      query = { urlNumber: value };
    }
    // Otherwise treat it as a urlLink string
    else {
      query = { urlLink: value };
    }

    const application = await VerificationModel.findOne(query);

    if (!application) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Application fetched successfully", application },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in GET /attestations/:value:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
