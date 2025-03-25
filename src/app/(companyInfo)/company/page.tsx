import CompanyList from "@/components/CompanyList";
import getCompanies from "@/libs/getCompaies";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default async function Company() {

    const companies = await getCompanies();
    console.log(companies);

    return(
        <main>
            <h1 className="text-xl font-medium text-center mb-5 mt-5">Select Companies</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
                <CompanyList companyJson={companies}/>
            </Suspense>
        </main>
    );
}