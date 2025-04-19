'use client'
import getCompany from "@/libs/getCompany";
import { Company, Rating } from "../../../../../interface";
import CompanyDetailClient from "@/components/CompanyDetails";

export default async function CompanyDetailPage({ params }: { params: { id: string } }) {
    const companyDetails = await getCompany(params.id);
    const companyDetailsData: Company = companyDetails.data;

    return (
        <main>
            <CompanyDetailClient company={companyDetailsData}></CompanyDetailClient>
        </main>
    );
}
