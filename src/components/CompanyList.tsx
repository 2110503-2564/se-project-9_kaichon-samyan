import { CompanyJson } from "../../interface";
import Card from "./Card";
import Link from "next/link";

export default async function CompanyList({
  companyJson,
}: {
  companyJson: Promise<CompanyJson>;
}) {
  const companyJsonData = await companyJson;
  // console.log(companyJsonData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "50px",
        justifyContent: "center", // ทำให้ item ในแถวสุดท้ายชิดซ้าย
      }}
    >
      {
        // companyJsonData.data.map((venueItem) =>(
        //     <Link href={`/venue/${venueItem._id}`} className="w-1/5" key={venueItem._id}>
        //     <Card venueName={venueItem.name} imgSrc={venueItem.picture} key={venueItem._id}/>
        //     </Link>
        // ))
        companyJsonData.data.map((company) => (
          <Link href={`/hotel/${company._id}`} key={company._id}>
            <Card company={company} />
          </Link>
        ))
      }
    </div>
  );
}
