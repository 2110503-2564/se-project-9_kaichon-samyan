import Image from "next/image";
import getCompany from "@/libs/getCompany";
import { Company } from "../../../../../interface";
import Link from "next/link";

export default async function CompanyDetailPage({params} : {params: {id: string}}) {

    const companyDetails =  await getCompany(params.id);
    const companyDetailsData: Company = companyDetails.data;

   return(
        <main className="flex justify-center items-center mt-28">
            <div className="flex flex-col items-center sm:flex-row border border-gray-300 shadow-lg rounded-md p-5 gap-5 ">
                <Image
                    src={"/img/interviewpic.png"}
                    alt="cover"
                    width={200}
                    height={200}
                />
                <div className="w-[300px]">
                    <h1 className="font-bold text-2xl mb-3">Interview Booking Form</h1>
                    <h1 className="mb-2" >Location: {companyDetailsData.address}</h1>
                    <h1 className="mb-2" >Website: {companyDetailsData.website}</h1>
                    <h1 className="mb-2" >Description: {companyDetailsData.description}</h1>
                    <h1 className="mb-4" >Telephone: {companyDetailsData.tel}</h1>
                    <Link href={{
                        pathname: "/booking",
                        query: { companyId: companyDetailsData._id }
                    }}>
                        <button className="p-3 bg-gray-300 hover:bg-gray-400 rounded-xl">Select Date</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}