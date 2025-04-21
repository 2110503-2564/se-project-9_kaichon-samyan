import InteractiveCard from './InteractiveCard';
import { Hotel } from '../../interface';
import Image from 'next/image';

export default function Card({ hotel } : { hotel:Hotel }) {
    return (
        
        <InteractiveCard>           
            <h1 className="text-2xl text-center   font-medium  font-['Playfair_Display'] ">{hotel.hotelName}</h1>
            <hr className="border-t-3 border-gray-800 mb-4 w-[100px] mx-auto" />
            <div className='flex justify-center items-center '>
                <Image src={hotel.picture} alt="cover" width={250} height={250} className="rounded-lg mb-3" />
            </div>
            <div className="ml-2  font-['Playfair_Display'] ">           
            <h1><span className='text-blue-800'>Address: </span>{hotel.address}</h1>
            <h1><span className='text-blue-800'>Tel: </span>{hotel.tel}</h1>
            <h1><span className='text-blue-800'>Website: </span>{hotel.website}</h1>
            </div>
        </InteractiveCard>
    );
}