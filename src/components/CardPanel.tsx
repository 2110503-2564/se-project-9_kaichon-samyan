'use client'
import Card from "./Card"
import { useReducer } from "react"
import Link from "next/link";

export default function CardPanel() {

    let defaultVenue = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0]
    ]);

    const cardReducer = (venueList:Map<string, number>, action:{type:string; venueName:string; rating?:number;}) => {

        switch(action.type) {
            case 'add' : {
                const newMenuList = new Map(venueList);
                newMenuList.set(action.venueName, action.rating??0);
                return newMenuList;
            }
            case 'remove' : {
                const newMenuList = new Map(venueList);
                newMenuList.delete(action.venueName);
                return newMenuList;
            }
            default : return defaultVenue;
        }
    }

    const [venueList, dispatchRating] = useReducer(cardReducer, defaultVenue);

    const mockVenueRepo = [{vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg"},
        {vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg"},
        {vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg"}
    ]

    return (
        <div>
            <div style={{margin:"20px", display:"flex", flexDirection:"row", 
                flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
                {
                    mockVenueRepo.map((venueItem) =>(
                        <Link href={`/venue/${venueItem.vid}`} className="w-1/5">
                        <Card venueName={venueItem.name} imgSrc={venueItem.image}
                        onRating={(venue:string, rate:number)=>dispatchRating({type:'add', venueName:venue, rating:rate})}
                        />
                        </Link>
                    ))
                }
            </div>
            <div className="w-full text-xl font-medium ml-10">
                Venue List with Ratings : {venueList.size}
            </div>
            <div className="ml-10 mb-10">
                { Array.from(venueList).map(([venue, rating]) => <div 
                data-testid={venue}
                onClick={() => dispatchRating({type:'remove', venueName:venue})}
                key={venue}>{venue} : {rating}</div>) } 
            </div>
        </div>
    );
}