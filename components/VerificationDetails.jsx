const VerificationDetails = ({ verificationData }) => {
  return (
    <div className="inline-block container  mx-auto md:text-[13px] mb-4 font-calibri">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="border border-black text-[16px italic text-[#aeaeae] p-[3px]">
              Verification Details
            </td>
            <td style={{ border: "none" }}></td>
          </tr>

          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Verifier Name
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.verifierName}
            </td>
          </tr>
          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Verification
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.verificationStatus}
            </td>
          </tr>
          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Verification Date & Time
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.verificationDateTime}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerificationDetails;
