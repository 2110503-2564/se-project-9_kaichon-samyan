"use client";
import {useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import editPassword from "@/libs/editPassword";
import uploadProfilePic from "@/libs/uploadProfile";
// this popup is used to edit profile picture and password
export default function EditProfilePopup({onClose, onSave}: {onClose: Function, onSave: Function}) {
    
    
}
