import connectMongo from "@/db/db";
import { VerificationModel } from "@/models/verification.model";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  await connectMongo();
  const { id } = params;

  try {
    const contentType = request.headers.get("content-type");
    if (contentType.includes("application/json")) {
      // Handle JSON status or simple updates
      const body = await request.json();
      const application = await VerificationModel.findByIdAndUpdate(id, body, {
        new: true,
      });

      if (!application) {
        return NextResponse.json(
          { error: "Verification not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "✅ Verification updated successfully", application },
        { status: 200 }
      );
    }

    if (contentType.includes("multipart/form-data")) {
      // Handle full form-data update
      const body = await request.formData();
      const existingApplication = await VerificationModel.findById(id);

      if (!existingApplication) {
        return NextResponse.json(
          { error: "Verification not found" },
          { status: 404 }
        );
      }

      // Original documents upload (if provided)
      let OriginalDocuments = existingApplication.OriginalDocuments;
      const originalFiles = body
        .getAll("originalDocuments")
        .filter((file) => typeof file === "object" && file.size > 0);
      if (originalFiles.length > 0) {
        OriginalDocuments = await Promise.all(
          originalFiles.map(async (file) => {
            const url = await uploadToCloudinary(file, "OriginalDocuments");
            return url;
          })
        );
      }

      // Attested documents upload (if provided)
      let AttestedDocuments = existingApplication.AttestedDocuments;
      const attestedFiles = body
        .getAll("attestedDocuments")
        .filter((file) => typeof file === "object" && file.size > 0);
      if (attestedFiles.length > 0) {
        AttestedDocuments = await Promise.all(
          attestedFiles.map(async (file) => {
            const url = await uploadToCloudinary(file, "AttestedDocuments");
            return url;
          })
        );
      }

      // Build update data
      const updateData = {
        applicantName:
          body.get("applicantName") || existingApplication.applicantName,
        documentType:
          body.get("documentType") || existingApplication.documentType,
        email: body.get("email") || existingApplication.email,
        phoneNumber: body.get("phoneNumber") || existingApplication.phoneNumber,
        paymentId: body.get("paymentId") || existingApplication.paymentId,
        transactionNumber:
          body.get("transactionNumber") ||
          existingApplication.transactionNumber,
        transactionDate:
          body.get("transactionDate") || existingApplication.transactionDate,
        totalPayment:
          body.get("totalPayment") || existingApplication.totalPayment,
        verificationStatus:
          body.get("verificationStatus") ||
          existingApplication.verificationStatus,
        verificationDateTime:
          body.get("verificationDateTime") ||
          existingApplication.verificationDateTime,
        verifierName:
          body.get("verifierName") || existingApplication.verifierName,
        urlLink: body.get("urlLink") || existingApplication.urlLink,
        urlNumber: body.get("urlNumber") || existingApplication.urlNumber,
        OriginalDocuments,
        AttestedDocuments,
      };

      // Update DB record
      const varifacationData = await VerificationModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      return NextResponse.json(
        { message: "✅ Verification updated successfully", varifacationData },
        { status: 200 }
      );
    }

    // Unsupported content type
    return NextResponse.json(
      { error: "Unsupported Content-Type" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ PATCH Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectMongo();
    const { id } = params;
    console.log(id);

    // Delete the application from the database
    const deletedApplication = await VerificationModel.findByIdAndDelete(id);

    if (!deletedApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Application deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in DELETE /attestations/:id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    await connectMongo();
    const { id } = params;

    // Fetch the application from the database
    const application = await VerificationModel.findById(id);

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
    console.error("❌ Error in GET /attestations/:id:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
