import { HotelJson } from "../../interface";
import Card from "./Card";
import Link from "next/link";

export default async function HotelList({
  hotelJson,
}: {
  hotelJson: Promise<HotelJson>;
}) {
  const hotelJsonData = await hotelJson;
  // console.log(hotelJsonData);

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
        // hotelJsonData.data.map((venueItem) =>(
        //     <Link href={`/venue/${venueItem._id}`} className="w-1/5" key={venueItem._id}>
        //     <Card venueName={venueItem.name} imgSrc={venueItem.picture} key={venueItem._id}/>
        //     </Link>
        // ))
        hotelJsonData.data.map((hotel) => (
          <Link href={`/hotel/${hotel._id}`} key={hotel._id}>
            <Card hotel={hotel} />
          </Link>
        ))
      }
    </div>
  );
}
