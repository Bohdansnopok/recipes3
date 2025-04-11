"use client"
import Image from "next/image";
import povar from "../../public/povar.png"
import starNotFilled from "../../public/starNotFilled.svg"
import star from "../../public/Star.svg"
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from "@/store/AuthStore";
import { Recipe } from "@/store/AuthStore";

export default function Home() {
    const { getRecipes } = useAuthStore();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipes
    });

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError || !data) {
        return <span>Error: {error?.message || 'No data returned'}</span>;
    }

    const recipes = data?.recipes || [];
    return (
        <>
            <div className="container flex items-end justify-between w-full">
                <div className="bg-[#FCE2CE] py-10 px-[60px] rounded-[10px] max-h-screen overflow-y-auto w-[730px]">
                    {recipes?.length > 0 ? (
                        recipes?.map((recipe: Recipe) => (
                            <div key={recipe?._id} className="bg-white py-[10px] px-[22px] mb-6">
                                <div className="flex items-center justify-between w-full mb-[20px]">
                                    <div className="flex items-center gap-3">
                                        <Image
                                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bobby"
                                            alt="User avatar"
                                            width={30}
                                            height={20}
                                            unoptimized
                                        />


                                        <p>{recipe?.user?.username}</p>
                                    </div>
                                    <div className="flex items-center gap-[3px]">
                                        <Image src={star} alt="" />
                                        <Image src={star} alt="" />
                                        <Image src={star} alt="" />
                                        <Image src={star} alt="" />
                                        <Image src={starNotFilled} alt="" />
                                        <div className="ml-2 text-[11px] text-[#7C7C7C]">(5)</div>
                                    </div>
                                </div>
                                <div className="px-[23px]">
                                    <Image src={recipe?.image} alt="" width={521} height={292} />
                                    <h2 className="text-[27px] font-bold mt-4 w-[] ">{recipe?.title}</h2>
                                    <p className="max-w-[513px] whitespace-nowrap overflow-hidden text-ellipsis mt-[18px]">{recipe?.caption}.</p>

                                    <div className="text-[20px] text-black/66 font-medium mt-5">
                                        {new Date(recipe?.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="" height={800} width={519} />
                </div>
            </div>
        </>
    );
}