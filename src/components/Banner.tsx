'use client'
import styles from './banner.module.css'
import Image from 'next/image'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {

    const cover = ['/img/cover.png', '/img/cover2.png' ,'/img/cover3.png', '/img/cover4.png']
    const [index, setIndex] = useState(0)
    const router = useRouter()
    const { data:session } = useSession()

    return (
        <div className={styles.banner} onClick={()=>setIndex(index+1)}>
            <Image src={cover[index%4]}
            alt='cover'
            fill={true}
            priority
            style={{ objectFit: "cover" }}
            />
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-medium font-serif bg-white/30 backdrop-blur-low px-4 py-2 rounded-lg'>Online Job Fair Registration</h1>
                <h3 className='text-xl font-serif '>Join on May 10th - 13th, 2022</h3>
            </div>
            {
                session? <div className='z-30 absolute top-5 right-10 font-semibold text-white text-xl'>
                    Welcome {session.user?.name}</div>:null
            }
            <button className='bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-2
                              m-2 rounded z-30 absolute bottom-0 right-0 hover:bg-cyan-600 hover:text-white hover:border-transparent'
                              onClick={ (e) => {e.stopPropagation(); router.push('/company')} }>
                                Register
                              </button>
        </div>
    );
}