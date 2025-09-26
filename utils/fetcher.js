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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data?.application || {};
  } catch (error) {
    return { error: true, message: "data fetch error" };
  }
};
