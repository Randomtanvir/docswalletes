const TransactionDetails = ({ verificationData }) => {
  return (
    <div className="inline-block container  mx-auto md:text-[13px] mb-4 font-calibri">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="border border-black text-[16px italic text-[#aeaeae] p-[3px]">
              Transaction Details
            </td>
            <td style={{ border: "none" }}></td>
          </tr>

          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Transaction Number
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.transactionNumber}
            </td>
          </tr>
          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Payment ID
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.paymentId}
            </td>
          </tr>
          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Total Payment
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.totalPayment}
            </td>
          </tr>
          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Transaction Date
            </td>
            <td className="border border-black text-[#1B6394] font-semibold ">
              {verificationData?.transactionDate}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
