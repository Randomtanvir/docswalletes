import Link from "next/link";

const DocumentDetails = ({ verificationData }) => {
  return (
    <div className="inline-block container  mx-auto md:text-[13px] mb-4 font-calibri">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className="border border-black text-[16px italic text-[#aeaeae] p-[3px]">
              Document Details
            </td>
            <td style={{ border: "none" }}></td>
          </tr>

          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Original Document
            </td>
            <td className="border italic border-black text-[#1B6394] font-semibold ">
              <Link
                href={`/document/show/${verificationData?.urlNumber}/product`}
                // target="_blank"
                // rel="noopener noreferrer"
              >
                View Document
              </Link>
            </td>
          </tr>
          <tr>
            <td className="border border-black w-[35%] font-sans p-[3px] text-[16px] font-normal text-black ">
              Attested Document
            </td>
            <td className="border border-black text-[#1B6394] font-semibold italic">
              <Link
                href={`/document/show/${verificationData?.urlNumber}/portfolio`}
                // target="_blank"
                // rel="noopener noreferrer"
              >
                View Document
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DocumentDetails;
