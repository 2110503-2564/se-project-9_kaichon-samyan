import InteractiveCard from './InteractiveCard';
import { Company } from '../../interface';

export default function Card({ company } : { company:Company }) {
    return (
        <InteractiveCard>
            <h1 className='text-2xl text-center mb-1'>{company.companyName}</h1>
            <h1>Address: {company.address}</h1>
            <h1>Description: {company.description}</h1>
            <h1>Tel: {company.tel}</h1>
            <h1>Website: {company.website}</h1>
        </InteractiveCard>
    );
}