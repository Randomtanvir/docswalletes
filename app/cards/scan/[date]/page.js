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

  // 🔹 Error message
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 mb-3">⚠️ Network slow. Retrying...</p>
        <button
          onClick={() => location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Retry
        </button>
      </div>
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
