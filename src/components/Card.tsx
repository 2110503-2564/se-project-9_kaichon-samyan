'use client'
import styles from './card.module.css'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function Card({ venueName, imgSrc, onRating} : { venueName:string, imgSrc:string, onRating?:Function}) {

    const [value, setValue] = useState<number | null>(0);

    return (
        <InteractiveCard>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                alt='Venue Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className="h-[30%] p-2 text-sm font-bold text-emerald-700 underline">
                <div>{venueName}</div>
                {
                    onRating? <Rating
                    id={venueName + ' Rating'}
                    name={venueName + ' Rating'}
                    data-testid={venueName + ' Rating'}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        onRating(venueName, newValue);
                    }}
                    onClick={(event) => event.stopPropagation()}
                    />:''
                }
            </div>
        </InteractiveCard>
    );
}