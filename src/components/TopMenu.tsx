import Image from "next/image";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";
import getMe from "@/libs/getMe";
import Link from "next/link";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  let userProfile;
  if(session?.user?.token) {
    userProfile = await getMe(session.user.token)
  }

  return (
    <div
      className={`${styles.menucontainer} flex items-center justify-between shadow-md bg-white`}
    >
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src={"/img/Chicken.jpeg"}
          className={styles.logoimg}
          alt="logo"
          width={60}
          height={60}
        />
        <span className="text-xl text-gray-800 font-serif mt-1 ">
          Kaichon Samyan
        </span>
      </Link>

      {/* Menu items */}
      <div className="flex items-center gap-8 mt-1">
        {session ? (
          <TopMenuItem
            title={`Sign-Out of ${
              userProfile.data.username || userProfile.data.name
            }`}
            pageRef="/api/auth/signout"
          />
        ) : (
          <TopMenuItem title="Sign-In" pageRef="/api/auth/signin" />
        )}

        {session?.user.user.role === "admin" ? (
          <TopMenuItem
            title="Manage reservation booking"
            pageRef="/reservation"
          />
        ) : (
          <TopMenuItem title="My booked reservation" pageRef="/reservation" />
        )}
        <TopMenuItem title="My Profile" pageRef="/profile">
          {(session?.user && userProfile.data.profileImg) && 
            <img 
              src={userProfile.data.profileImg}
              alt="profileImg" 
              className="rounded-[50%] h-[50px] w-[50px] object-cover"
            />
          }
        </TopMenuItem>
      </div>
    </div>
  );
}
