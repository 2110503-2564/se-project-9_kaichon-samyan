import InteractiveCard from './InteractiveCard';
import { Hotel } from '../../interface';

export default function Card({ hotel } : { hotel:Hotel }) {
    return (
        <InteractiveCard>
            <h1 className='text-2xl text-center mb-1'>{hotel.hotelName}</h1>
            <h1>Address: {hotel.address}</h1>
            {/* <h1>Description: {hotel.description}</h1> */}
            <h1>Tel: {hotel.tel}</h1>
            <h1 className='text-blue-700'>Website: {hotel.website}</h1>
        </InteractiveCard>
    );
}