import Button from "@/components/Button";
import { getSingleVerificationDataByURLLINK } from "@/utils/fetcher";
import React from "react";

const page = async ({ params }) => {
  const { id } = params;
  const data = await getSingleVerificationDataByURLLINK(id);

  return (
    <section className="w-full bg-white">
      <Button />
      <div className="mt-10 md:mt-5">
        {data?.AttestedDocuments?.map((doc, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={doc}
              alt={`Document ${index + 1}`}
              className="w-full max-w-2xl h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
