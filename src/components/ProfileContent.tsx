"use client"

import { UserStore } from "@/store/UserStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import LogoutIcon from "../../public/logout.svg"
import DeleteIcon from "../../public/delete.svg"

export default function ProfileContent() {
    const { getRecipesByCurrentuser, logout } = UserStore();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipesByCurrentuser
    })
    const userFirstSignUp = localStorage.getItem("userFirstSignUp");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const recipes = data || [];

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError || !data) {
        return <span>Error: {error?.message || 'No data returned'}</span>;
    }

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No token found! You need to be logged in.");
            return;
        }

        try {
            const response = await axios.delete(`https://recipe-yt.onrender.com/api/recipes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success("Recipe deleted successfully!");
            }
        } catch (error) {
            toast.error("Error deleting recipe");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="bg-[#FCE2CE] py-10 px-[60px] rounded-[10px]">
            <h1 className="text-center font-medium text-[47px]">My Profile</h1>
            <div className="w-[513px] bg-white px-[28px] pb-5 pt-11 mt-10 mb-12 rounded-[10px]">
                <div className="flex items-start gap-10">
                    <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                        alt="User avatar"
                        width={113}
                        height={113}
                        unoptimized
                    />
                    <div>
                        <div className="text-[25px] font-bold">{userName}</div>
                        <div className="mt-3 mb-5 text-black/70 text-[20px]">{userEmail}</div>
                        <div className="text-black/70 text-[20px]">{userFirstSignUp}</div>
                    </div>
                </div>
            </div>

            <button onClick={logout} className="flex items-center justify-center gap-2 text-[25px] font-bold py-[10px] w-full bg-[#EF8C6D] rounded-[10px] cursor-pointer">
                <Image src={LogoutIcon} alt="Logout icon" />
                Logout
            </button>

            <div className="mt-7">
                <div className="flex items-center justify-between w-full">
                    <h2>My Receipts</h2>
                    <div className="text-[27px] text-black/70 font-medium">{recipes?.length} receipts</div>
                </div>

                <div className="max-h-[430px] overflow-y-auto mt-9 flex flex-col  gap-7">
                    {recipes?.length > 0 ? (
                        recipes?.map((recipe) => (
                            <div key={recipe._id} className="bg-white max-w-[450px] p-4 rounded-[10px]">
                                <div className="flex items-center gap-[10px]">
                                    <Image src={recipe.image} alt="User-recipe image" height={133} width={237} />
                                    <div>
                                        <div className="font-bold mb-5">{recipe.title}</div>
                                        <p>
                                            {recipe.caption}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full mt-3">
                                    <div className="text-black/66">{recipe?.createdAt
                                        ? new Date(recipe.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                        : "No date available"}</div>
                                    <button onClick={() => { console.log(recipe._id); handleDelete(recipe._id) }}><Image src={DeleteIcon} alt="Delete icon" /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Link href='/create' className="text-center  text-base font-bold">You have not any recipe. You may create recipe if you click here</Link>
                    )}
                </div>
            </div>
        </div>
    )
}