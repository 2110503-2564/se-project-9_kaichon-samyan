import Card from "./Card";
import Link from "next/link";
import { VenueJson } from "../../interface";

export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}) {

    const venueJsonData = await venuesJson
    console.log(venueJsonData)

    return(
        <div style={{margin:"20px", display:"flex", flexDirection:"row", 
            flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
            {
                venueJsonData.data.map((venueItem) =>(
                    <Link href={`/venue/${venueItem._id}`} className="w-1/5" key={venueItem._id}>
                    <Card venueName={venueItem.name} imgSrc={venueItem.picture} key={venueItem._id}/>
                    </Link>
                ))
            }
        </div>
    );
}