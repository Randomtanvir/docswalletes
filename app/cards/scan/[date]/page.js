import DigitalAttestationResult from "@/components/DigitalAttestationResult";
import { getSingleVerificationDataByURLLINK } from "@/utils/fetcher";
import React from "react";

const page = async ({ params }) => {
  const { date } = params;
  const verificationData = await getSingleVerificationDataByURLLINK(date);
  if (!verificationData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <DigitalAttestationResult verificationData={verificationData} />
    </div>
  );
};

export default page;
