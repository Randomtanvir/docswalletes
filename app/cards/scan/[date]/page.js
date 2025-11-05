import DigitalAttestationResult from "@/components/DigitalAttestationResult";
import { getSingleVerificationDataByURLLINK } from "@/utils/fetcher";
import React from "react";

const page = async ({ params }) => {
  const { date } = params;
  const verificationData = await getSingleVerificationDataByURLLINK(date);

  if (verificationData?.error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Data fetch failed refresh and try again</p>
      </div>
    );
  }

  return (
    <div>
      <DigitalAttestationResult verificationData={verificationData} />
    </div>
  );
};

export default page;
