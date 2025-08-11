import React from "react";
import VerificationCard from "./_components/VerificationCard";
import { getAllVerificationData } from "@/utils/fetcher";
import Link from "next/link";

const ListsPage = async () => {
  const verificationData = await getAllVerificationData();

  return (
    <div>
      <Link
        href="/dashboard"
        className="text-2xl block font-bold text-green-500 mb-4 text-center hover:underline hover:text-green-700 transition-all "
      >
        HOME
      </Link>
      {verificationData?.length > 0 &&
        verificationData?.map((veri, i) => (
          <VerificationCard key={veri._id} index={i} VerificationData={veri} />
        ))}
    </div>
  );
};
export default ListsPage;
