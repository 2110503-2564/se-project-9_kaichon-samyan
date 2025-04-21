import InteractiveCard from './InteractiveCard';
import { Hotel } from '../../interface';
import Image from 'next/image';

export default function Card({ hotel } : { hotel:Hotel }) {
    return (
        <InteractiveCard>
            <div className='flex justify-center items-center'>
                <Image src={hotel.picture} alt="cover" width={200} height={200} />
            </div>
            <h1 className='text-2xl text-center mb-1'>{hotel.hotelName}</h1>
            <h1>Address: {hotel.address}</h1>
            {/* <h1>Description: {hotel.description}</h1> */}
            <h1>Tel: {hotel.tel}</h1>
            <h1 className='text-blue-700'>Website: {hotel.website}</h1>
        </InteractiveCard>
    );
}