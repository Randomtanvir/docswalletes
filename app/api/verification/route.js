import connectMongo from "@/db/db";
import { VerificationModel } from "@/models/verification.model";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectMongo();
    const body = await request.formData();

    // Multiple images upload — only if files exist
    const originalDocument = body
      .getAll("originalDocuments")
      .filter((file) => typeof file === "object" && file.size > 0);

    const originalDocumentArray = await Promise.all(
      originalDocument.map(async (file) => {
        const url = await uploadToCloudinary(file, "OriginalDocuments");
        return url;
      })
    );

    const attestedDocument = body
      .getAll("attestedDocuments")
      .filter((file) => typeof file === "object" && file.size > 0);

    const attestedImageArray = await Promise.all(
      attestedDocument.map(async (file) => {
        const url = await uploadToCloudinary(file, "AttestedDocuments");
        return url;
      })
    );

    // Build application data
    const applicationData = {
      applicantName: body.get("applicantName"),
      documentType: body.get("documentType"),
      email: body.get("email"),
      phoneNumber: body.get("phoneNumber"),
      paymentId: body.get("paymentId"),
      transactionNumber: body.get("transactionNumber"),
      transactionDate: body.get("transactionDate"),
      totalPayment: body.get("totalPayment"),
      verificationStatus: body.get("verificationStatus"),
      verificationDateTime: body.get("verificationDateTime"),
      verifierName: body.get("verifierName"),
      urlLink: body.get("urlLink"),
      urlNumber: body.get("urlNumber"),
      OriginalDocuments: originalDocumentArray,
      AttestedDocuments: attestedImageArray,
    };

    // Save to DB
    const application = new VerificationModel(applicationData);
    await application.save();

    return NextResponse.json(
      { message: "Application saved successfully", application },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in POST /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(_request) {
  try {
    await connectMongo();
    const verificationInfo = await VerificationModel.find({}).sort({
      createdAt: -1,
    });
    return NextResponse.json(
      { message: "✅ Applications fetched successfully", verificationInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in GET /applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
