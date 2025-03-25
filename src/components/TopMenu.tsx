import Image from "next/image";
import styles from "./topmenu.module.css"
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import { session } from "../../interface";
import Link from "next/link";

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return (
        <div className={styles.menucontainer}>
            <Link href={"/"}>
                <Image src={'/img/logo.png'} className={styles.logoimg} alt="logo" width={0} height={0} sizes="100vh"/>
            </Link>
            {/* <TopMenuItem title="Booking" pageRef="/booking"/> */}
            <div className="flex items-center w-full flex-row pl-5">
                <div className="flex gap-8 place-content-between">
                    {
                        session? <TopMenuItem title={`Sign-Out of ${session.user?.user.name}`} pageRef="/api/auth/signout" />
                        :<TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
                    }
                    {
                        session?.user.user.role === "admin" ?
                        <TopMenuItem title="Manage booking session" pageRef="/session" />
                        :
                        <TopMenuItem title="My booking Session" pageRef="/session" />
                    }
                </div>
            </div>
        </div>
    );
}