// utils/fetcher.js
export async function getAllVerificationData(page = 1, limit = 5) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/verification?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch verification data");

  return res.json();
}

export const getSingleVerificationData = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verification/${id}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data?.application || {};
  } catch (error) {
    return { error: true, message: "data fetch error" };
  }
};
export const getSingleVerificationDataByURLLINK = async (url) => {
  try {
    // Use a private env variable for server calls
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("Missing API_URL environment variable");

    const response = await fetch(`${apiUrl}/${url}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    const data = await response.json();
    return data?.application || {};
  } catch (error) {
    console.error("Server fetch error:", error.message);
    return { error: true, message: error.message };
  }
};
