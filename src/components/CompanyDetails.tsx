'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Company, Rating } from "../../interface";
import RatingForm from "@/components/RatingForm";
import { useState } from "react";
import DeleteConfirmationModal from "./RatingDelete";
import { Anybody } from "next/font/google";

export default function CompanyDetailClient({ company }: { company: Company }) {
    const { data: session } = useSession();
    const currentUsername = session?.user?.name || "";
    const isAdmin = session?.user?.role === "admin";
    
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRating, setSelectedRating] = useState<any | null>(null);


    //dummy 
    const ratings: Rating[] = [
        {
          username: "Ajarntoe",
          comment: "This hotel very very good krub 4/5",
          stars: 4,
          timestamp: "2025-04-19T12:19:00",
        },
        {
          username: "Guy",
          comment: "This hotel sucks",
          stars: 1,
          timestamp: "2021-01-02T12:34:00",
        },
        {
          username: "username",
          comment: "[Comments]",
          stars: 0,
          timestamp: "2023-10-12T09:00:00",
        }
      ];

    const handleNewRating = (rating: number, comment: string) => {
        // TODO: Send rating + comment to API
        console.log("Submitted:", rating, comment);
        setShowForm(false);
    };

    const handleDeleteClick = (rating: any) => {
        setSelectedRating(rating);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async (ratingId: string) => {
        //TODO: Delete rating
        console.log("Deleted: ", ratingId)
        setShowDeleteModal(false);
    };
      
      
      

    return (
        <main className="flex justify-center items-center mt-28 flex-col">
            <div className="flex flex-col items-center sm:flex-row border border-gray-300 shadow-lg rounded-md p-5 gap-5">
                <Image src={"/img/interviewpic.png"} alt="cover" width={200} height={200} />
                <div className="w-[300px]">
                    <h1 className="font-bold text-2xl mb-3">Interview Booking Form</h1>
                    <h1 className="mb-2">Location: {company.address}</h1>
                    <h1 className="mb-2">Website: {company.website}</h1>
                    <h1 className="mb-2">Description: {company.description}</h1>
                    <h1 className="mb-4">Telephone: {company.tel}</h1>
                    <div className="flex flex-row justify-between">
                        <Link
                            href={{
                                pathname: "/booking",
                                query: { companyId: company._id },
                            }}
                        >
                            <button className="p-3 bg-gray-300 hover:bg-gray-400 rounded-xl">Select Date</button>
                        </Link>
                        <div>Rating: Avg.Rating</div>
                    </div>
                </div>
            </div>
                            
            <br></br>
            <button
                onClick={() => setShowForm(true)}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
                Add New Rating
            </button>
            <br></br>

            {showForm && (
                <RatingForm
                onSubmit={handleNewRating}
                onCancel={() => setShowForm(false)}
                />
            )}

            <div className="flex flex-col gap-4 w-full max-w-xl">
                {ratings.map((rating, idx) => (
                    <div
                        key={idx}
                        className={`border p-4 rounded-md ${rating.username === currentUsername ? 'bg-blue-50' : ''}`}
                    >
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">Rating by {rating.username}</p>
                            <p>{rating.timestamp}</p>
                        </div>
                        <p className="my-2">{rating.comment}</p>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < rating.stars ? "text-yellow-400" : "text-gray-300"}>
                                    ★
                                </span>
                            ))}
                            <div className="flex gap-2 mt-2">
                                {rating.username === currentUsername && (
                                    <button className="px-3 py-1 rounded-md text-sm text-white bg-blue-500 hover:bg-blue-600 transition">
                                    Edit
                                    </button>
                                )}

                                {(rating.username === currentUsername || isAdmin) && (
                                    <button className="px-3 py-1 rounded-md text-sm text-white bg-red-500 hover:bg-red-600 transition"
                                    onClick={() => handleDeleteClick(rating)}>
                                        Delete
                                    </button>
                                )}
                            </div>

                            {showDeleteModal && selectedRating && (
                                <DeleteConfirmationModal
                                    rating={selectedRating}
                                    onCancel={() => setShowDeleteModal(false)}
                                    onConfirm={handleConfirmDelete}
                                />
                            )}


                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
