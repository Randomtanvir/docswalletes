"use client";

import React, { useEffect, useState } from "react";
import VerificationCard from "./_components/VerificationCard";
import { getAllVerificationData } from "@/utils/fetcher";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ListsPage = ({ searchParams }) => {
  const [verificationInfo, setVerificationInfo] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const page = parseInt(searchParams?.page) || 1;
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAllVerificationData(page, limit);

        if (result?.error) {
          setError(result.message || "Failed to fetch data.");
        } else {
          setVerificationInfo(result.verificationInfo || []);
          setPagination(result.pagination || {});
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  // 🔹 Loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  // 🔹 Error message
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 mb-3">⚠️ {error}</p>
        <button
          onClick={() => location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link
        href="/dashboard"
        className="text-2xl block font-bold text-green-500 mb-6 text-center hover:underline hover:text-green-700 transition-all"
      >
        HOME
      </Link>

      {verificationInfo?.length > 0 ? (
        verificationInfo.map((veri, i) => (
          <VerificationCard key={veri._id} index={i} VerificationData={veri} />
        ))
      ) : (
        <p className="text-center text-gray-500">No applications found.</p>
      )}

      {/* 🔹 Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-8">
          {/* Prev */}
          {pagination.hasPrevPage ? (
            <Link
              href={`?page=${pagination.currentPage - 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
              Prev
            </span>
          )}

          {/* Page Info */}
          <span className="px-4 py-2 font-semibold text-lg text-green-700 bg-green-100 rounded-lg shadow-sm">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          {/* Next */}
          {pagination.hasNextPage ? (
            <Link
              href={`?page=${pagination.currentPage + 1}`}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow hover:opacity-90 transition"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed">
              Next
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ListsPage;
