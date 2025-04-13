"use client"

import Image from "next/image";
import star from "../../public/Star.svg"
import { useQuery } from "@tanstack/react-query";
import { UserStore } from '@/store/UserStore'
import starNotFilled from "../../public/starNotFilled.svg"
import { RecipeDetails } from "./RecipeDetail";
import { useState } from "react";
import { Recipe } from "@/types/Store";
import { formatDate } from "@/utils/formattedDate";

export default function HomeContent() {
    const { getRecipes } = UserStore();
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipes
    });

    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const openModal = (recipe: Recipe) => {
        setSelectedRecipe(recipe);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    if (isPending) {
        return <span>Loading...</span>;
    }
    if (isError || !data) {
        return <span>Error: {error?.message || 'No data returned'}</span>;
    }
    const recipes = data?.recipes || [];

    return (
        <>
            {recipes?.length > 0 ? (
                recipes?.map((recipe: Recipe) => (
                    <div key={recipe?._id} className="bg-white py-[10px] px-[22px] mb-6" onClick={() => openModal(recipe)}>
                        <div className="flex items-center justify-between w-full mb-[20px]">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.user.profileImage}`}
                                    alt="User avatar"
                                    width={30}
                                    height={20}
                                    unoptimized
                                />
                                <p>{recipe?.user?.username}</p>
                            </div>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                    <Image
                                        key={index}
                                        src={index < Math.round(recipe.rating) ? star : starNotFilled}
                                        alt={index < Math.round(recipe.rating) ? "Star-active icon" : "Not-active star"}
                                    />
                                ))}
                                <div className="ml-2 text-[11px] text-[#7C7C7C]">
                                    ({recipe.rating || 0})
                                </div>
                            </div>
                        </div>
                        <div className="px-[23px]">
                            <Image src={recipe?.image} alt="Recipe-image" width={521} height={292} />
                            <h2 className="text-[27px] font-bold mt-4 w-[] ">{recipe?.title}</h2>
                            <p className="max-w-[513px] whitespace-nowrap overflow-hidden text-ellipsis mt-[18px]">{recipe?.caption}.</p>
                            <div className="text-[20px] text-black/66 font-medium mt-5">
                                {recipe?.createdAt && formatDate(recipe.createdAt)}
                            </div>
                        </div>
                    </div >
                ))
            ) : (
                <p>No data available</p>
            )
            }
            {
                selectedRecipe && (
                    <RecipeDetails>
                        <button
                            onClick={closeModal}
                            className='absolute top-3 right-4 bg-transparent border-none text-[1.75rem] cursor-pointer text-[#666666]'
                        >
                            &times;
                        </button>
                        <Image src={selectedRecipe.image} alt="recipe" width={500} height={200} className="w-full" />
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                                <h2 className="text-[27px] font-bold mt-4">{selectedRecipe.title}</h2>
                            </div>
                            <div className="mt-4">
                                <div className="text-[14px]">{selectedRecipe.createdAt && formatDate(selectedRecipe?.createdAt)}</div>
                                <div className="text-yellow-700 font-bold text-[14px] text-right flex items-center justify-end">
                                    Rating: {selectedRecipe.rating}
                                    <div className="flex ml-2">
                                        {[...Array(5)].map((_, index) => (
                                            <Image
                                                key={index}
                                                src={index < Math.round(selectedRecipe.rating) ? star : starNotFilled}
                                                alt={index < Math.round(selectedRecipe.rating) ? "Star-active icon" : "Not-active star"}
                                            />
                                        ))}
                                        <div className="ml-2 text-[11px] text-[#7C7C7C]">
                                            ({selectedRecipe.rating || 0})
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-[18px]">{selectedRecipe.caption}</p>
                    </RecipeDetails>
                )
            }
        </>
    )
}