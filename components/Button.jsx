"use client";

import { useRouter } from "next/navigation";

const Button = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      //   style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}
      className="px-3 absolute right-5 top-5 py-2 font-sans font-semibold text-[14px] cursor-pointer bg-[#49AFCD] text-white rounded-[5px]"
    >
      Close / اغلاق
    </button>
  );
};

export default Button;
