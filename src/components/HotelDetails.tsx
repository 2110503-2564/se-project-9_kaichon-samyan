'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Hotel, Rating } from "../../interface";
import RatingForm from "@/components/RatingForm";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "./RatingDelete";
import RatingEdit from "@/components/RatingEdit";
import { useRouter } from "next/navigation";

export default function HotelDetailClient({ hotel }: { hotel: Hotel }) {
    const session = useSession();
    const currentUsername = session.data?.user?.user?.name || "";
    const isAdmin = session.data?.user?.user?.role === "admin";
    
    const [showRatingForm, setShowRatingForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditForm,setShowEditForm] = useState(false);
    const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const ratings = hotel.rating || [];

    useEffect(() => {
        if (ratings.length === 0) {
            setAverageRating(null);
            return;
        }
    
        const totalScore = ratings.reduce((acc, rating) => acc + rating.score, 0);
        setAverageRating(totalScore / ratings.length);
    }, [ratings]);

    const handleCloseRatingForm = () => {
        setShowRatingForm(false);
    }

    const getAverageRating = () => {
        if (ratings.length === 0 || averageRating === null) return "No ratings yet";
        return "Rating : " + averageRating.toFixed(2) + "★";
    };

    return (
        <main className="flex justify-center items-center mt-28 flex-col">
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-500 font-semibold">Loading...</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center sm:flex-row border border-gray-300 shadow-lg rounded-md p-5 gap-5">
                <Image src={hotel.picture} alt="cover" width={200} height={200} />
                <div className="w-[300px]">
                    <h1 className="font-bold text-2xl mb-3">{hotel.hotelName}</h1>
                    <h1 className="mb-2">Location: {hotel.address}</h1>
                    <h1 className="mb-2">Website: {hotel.website}</h1>
                    <h1 className="mb-2">Description: {hotel.description}</h1>
                    <h1 className="mb-4">Telephone: {hotel.tel}</h1>
                    <div className="flex flex-row justify-between">
                        <Link
                            href={{
                                pathname: "/booking",
                                query: { hotelId: hotel._id },
                            }}
                        >
                            <button className="p-3 bg-gray-300 hover:bg-gray-400 rounded-xl">Select Date</button>
                        </Link>
                        <div>{getAverageRating()}</div>
                    </div>
                </div>
            </div>
                            
            <br></br>
            <button
                onClick={() => setShowRatingForm(true)}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
                Add New Rating
            </button>
            <br></br>

            {showRatingForm && (
                <RatingForm
                    hotelId={hotel._id}
                    handleClose={handleCloseRatingForm}
                    setLoading={(b:boolean) => setLoading(b)}
                />
            )}

            <div className="flex flex-col gap-4 w-full max-w-xl mb-10">
                {ratings.map((rating, idx) => (
                    <div
                        key={idx}
                        className={`border p-4 rounded-md ${rating.user.name === currentUsername ? 'bg-blue-50' : ''}`}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Rating by {rating.user.name}</p>
                            <p>{rating.createdAt ? rating.createdAt.split("T")[0] : ""}  {rating.createdAt ? rating.createdAt.split("T")[1].split(".")[0] : ""}</p>
                        </div>
                        <p className="my-2">{rating.comment}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < rating.score ? "text-yellow-400" : "text-gray-300"}>
                                    ★
                                </span>
                            ))}
                            <div className="flex gap-2 mt-2">
                                {(rating.user.name === currentUsername || isAdmin) && (
                                    <button className="ml-1 px-3 py-1 rounded-md text-sm text-black bg-gray-300 hover:bg-zinc-500 transition"
                                    onClick={() => {setShowEditForm(true); setSelectedRating(rating)}}>
                                        Edit
                                    </button>
                                )}
                                {showEditForm && selectedRating && (
                                    <RatingEdit
                                        hotelId={hotel._id}
                                        rating={selectedRating}
                                        handleClose={() => setShowEditForm(false)}
                                        setLoading={(b:boolean) => setLoading(b)}
                                    />
                                )}
                            </div>
                            <div className="flex gap-2 mt-2">
                                {(rating.user.name === currentUsername || isAdmin) && (
                                    <button className="ml-1 px-3 py-1 rounded-md text-sm text-white bg-red-500 hover:bg-red-600 transition"
                                    onClick={() => {setShowDeleteModal(true); setSelectedRating(rating)}}>
                                        Delete
                                    </button>
                                )}
                            </div>
                            

                        </div>
                    </div>
                ))}
                {showDeleteModal && selectedRating && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
                        <DeleteConfirmationModal
                            hotelId={hotel._id}
                            rating={selectedRating}
                            handleClose={() => {setShowDeleteModal(false)}}
                            setLoading={(b:boolean) => setLoading(b)}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}