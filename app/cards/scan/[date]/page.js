"use client";
import { useEffect, useState } from "react";
import DigitalAttestationResult from "@/components/DigitalAttestationResult";
import { getSingleVerificationDataByURLLINK } from "@/utils/fetcher";

export default function Page({ params }) {
  const { date } = params;
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getSingleVerificationDataByURLLINK(date);
        if (result.error) {
          setError(result.message || "Data fetch failed");
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getData();
  }, [date]);

  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        Network slow. Retrying...
      </p>
    );
  }

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );

  return <DigitalAttestationResult verificationData={data} />;
}
