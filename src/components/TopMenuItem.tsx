import { Children } from 'react';
import styles from './topmenu.module.css'
import Link from 'next/link'

export default function TopMenuItem({ title, pageRef, children} : { title:string, pageRef:string, children?: React.ReactNode}) {
    return (
        <Link className={styles.itemcontainer} href={pageRef} prefetch={true}>
            {title}
            {children}
        </Link>
    );
}