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
  const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  for (let i = 0; i < 2; i++) {
    try {
      const response = await fetch(`${apiUrl}/${url}`, { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        return data?.application || {};
      }
    } catch (err) {
      if (i === 1) throw err; // দ্বিতীয়বারেও fail হলে throw করো
    }
  }

  return { error: true, message: "Data fetch error" };
};
