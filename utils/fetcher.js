export const getAllVerificationData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verification`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data?.verificationInfo || [];
  } catch (error) {
    return { error: true, message: "data fetch error" };
  }
};
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
