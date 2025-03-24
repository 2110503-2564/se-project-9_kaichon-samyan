import Image from "next/image";
import getVenue from "@/libs/getVenue";
import getCompany from "@/libs/getCompany";
import { Company } from "../../../../../interface";
import Link from "next/link";

export default async function CompanyDetailPage({params} : {params: {id: string}}) {

    const companyDetails =  await getCompany(params.id);
    const companyDetailsData: Company = companyDetails.data;

   return(
           <main>
               <div className="bg-blue-300 p-5">
                <h1 className="text-2xl font-bold">{companyDetailsData.companyName}.</h1>
               </div>
               <div className="flex gap-3 space-x-5 p-5">
                <div className="w-[30%]">
                    <h1 className="bg-gray-100 p-3">Location: {companyDetailsData.address}</h1>
                    <h1 className="bg-gray-200 p-3">Website: {companyDetailsData.website}</h1>
                    <h1 className="bg-gray-100 p-3">Description: {companyDetailsData.description}</h1>
                    <h1 className="bg-gray-200 p-3">Telephone: {companyDetailsData.tel}</h1>
                </div>
                <div className="">
                    <Link href={{
                        pathname: "/booking",
                        query: { companyId: companyDetailsData._id }
                    }}>
                        <button className="p-3 bg-green-300 hover:bg-green-400 rounded-xl">Booking Interview Session</button>
                    </Link>
                </div>
               </div>
           </main>
    );
}