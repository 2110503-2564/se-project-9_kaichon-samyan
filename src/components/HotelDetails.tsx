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
        <main className="flex flex-col font-['Playfair_Display'] items-center px-4 sm:px-8 w-full max-w-3xl mx-auto pt-20">
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-500 font-semibold">Loading...</p>
                    </div>
                </div>
            )}
            <div className="flex flex-col sm:flex-row items-center sm:items-start border border-gray-300 shadow-lg rounded-xl p-6 gap-8 bg-white w-full max-w-full">
                <div className="relative w-[250px] h-[250px] overflow-hidden rounded-lg shadow-xl">
                    <Image 
                        src={hotel.picture} 
                        alt="cover" 
                        layout="fill" 
                        objectFit="cover" 
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-col w-full sm:w-[300px] text-gray-800">
                    <h1 className="font-medium font-semibold text-4xl text-gray-900 mx-auto mb-4">{hotel.hotelName}</h1>
                    <hr className="border-t-3 border-gray-800 mb-4 w-[100px] mx-auto" />
                    <h2 className="text-lg font-medium text-gray-600 mb-2">Location: <span className="font-semibold text-gray-800">{hotel.address}</span></h2>
                    <h2 className="text-lg font-medium text-gray-600 mb-2">Website: <a href={hotel.website} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">{hotel.website}</a></h2>
                    <h2 className="text-lg font-medium text-gray-600 mb-4">Description: {hotel.description}</h2>
                    <h2 className="text-lg font-medium text-gray-600 mb-6">Telephone: {hotel.tel}</h2>
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <Link href={{ pathname: "/booking", query: { hotelId: hotel._id } }}>
                            <button className="px-6 py-3 bg-black text-white rounded-xl shadow-lg hover:bg-gray-900 transition duration-300">Select Date</button>
                        </Link>
                        <div className="mt-4 sm:mt-0 text-xl font-semibold text-yellow-600">{getAverageRating()}</div>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <button
                    onClick={() => setShowRatingForm(true)}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition duration-300"
                >
                    Add New Rating
                </button>
            </div>

            {showRatingForm && (
                <RatingForm
                    hotelId={hotel._id}
                    handleClose={handleCloseRatingForm}
                    setLoading={(b:boolean) => setLoading(b)}
                />
            )}

            <div className="flex flex-col gap-6 w-full max-w-4xl mb-10 mt-8">
                {ratings.map((rating, idx) => (
                    <div
                        key={idx}
                        className={`border p-6 rounded-lg shadow-md ${rating.user.name === currentUsername ? 'bg-blue-50' : 'bg-white'}`}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-lg text-gray-700">Rating by {rating.user.name}</p>
                            <p className="text-sm text-gray-500">{rating.createdAt ? rating.createdAt.split("T")[0] : ""}  {rating.createdAt ? rating.createdAt.split("T")[1].split(".")[0] : ""}</p>
                        </div>
                        <p className="my-3 text-gray-700">{rating.comment}</p>
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < rating.score ? "text-yellow-400" : "text-gray-300"}>
                                    ★
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-4">
                            {(rating.user.name === currentUsername || isAdmin) && (
                                <button 
                                    className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600 transition duration-300"
                                    onClick={() => {setShowEditForm(true); setSelectedRating(rating)}}
                                >
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

                            {(rating.user.name === currentUsername || isAdmin) && (
                                <button 
                                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 transition duration-300"
                                    onClick={() => {setShowDeleteModal(true); setSelectedRating(rating)}}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {showDeleteModal && selectedRating && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-20">
                        <DeleteConfirmationModal
                            hotelId={hotel._id}
                            rating={selectedRating}
                            handleClose={() => setShowDeleteModal(false)}
                            setLoading={(b:boolean) => setLoading(b)}
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
