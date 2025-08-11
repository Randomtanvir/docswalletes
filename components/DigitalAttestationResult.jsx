import React from "react";

import CandidateDetails from "./CandidateDetails";
import VerificationDetails from "./VerificationDetails";
import DocumentDetails from "./DocumentDetails";
import TransactionDetails from "./TransactionDetails";

const DigitalAttestationResult = ({ verificationData }) => {
  return (
    <div className="border-1 relative font-calibri border-black md:p-10 p-5 bg-white m-0 md:m-[0px_17%] ">
      <div className="border border-gray-900 p-2">
        {/* Header */}
        <div className="flex justify-between items-center">
          {/* Left Logo */}
          <div className="flex items-center">
            <img src="/logo1.png" alt="Oman Post" className="" />
          </div>
          {/* Right Logo */}
          <div>
            <img src="/logo2.png" alt="Ministry Logo" className="" />
          </div>
        </div>

        {/* Arabic Title */}
        <div className="p-10">
          <div className="text-center mb-2 text-[32px] font-calibri font-semibold text-[#6ec1e4]">
            بيانات التصديق الرقمي
          </div>

          {/* English Title */}
          <div className="leading-[1.2] mb-2 md:hidden block text-[32px] text-black font-bold">
            Digital <br /> Attestation <br /> Result
          </div>
          <div className="leading-[1.2] text-center hidden md:block mb-5 text-[32px] text-black font-bold">
            Digital Attestation Result
          </div>
        </div>

        <div className="absolute top-[50%] md:top-[700px] [writing-mode:vertical-rl] left-0 text-[18px] font-semibold text-[#49afcd] ">
          {" "}
          Powered by VFS Global
        </div>

        {/* Transaction Details Table */}
        <TransactionDetails verificationData={verificationData} />

        {/* Candidate Details Table */}
        <CandidateDetails verificationData={verificationData} />

        {/* Verification Details Table */}
        <VerificationDetails verificationData={verificationData} />

        {/* Document Details Table */}
        <DocumentDetails verificationData={verificationData} />

        {/* Footer */}
        <div className="text-center mt-5 text-gray-400 text-[12px]">
          {/* Copyright 2025, All Right Reserved */}
        </div>
      </div>
    </div>
  );
};

export default DigitalAttestationResult;
