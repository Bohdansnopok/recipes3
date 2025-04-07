"use client"
import Image from "next/image";
import povar from "../../public/povar.png"
import dubaiChoko from "../../public/dubaiChocoSmall.jpg"
// import avatar from "../../public/blackAvatar.svg"
import starNotFilled from "../../public/starNotFilled.svg"
import star from "../../public/Star.svg"
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from "@/store/AuthStore";

export default function Home() {
    const { getRecipes } = useAuthStore();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipes
    })
    console.log(data)

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <section>
            <div className="container flex items-end justify-between gap-[164px] w-full">
                <div className="bg-[#FCE2CE] py-10 px-[60px] rounded-[10px] max-h-screen overflow-y-auto">
                    {data.length > 0 ? (
                        data.map((recipe) => (
                            <>
                                <div className="bg-white py-[10px] px-[22px]" key={recipe._id}>
                                    <div className="flex items-center gap-3">
                                        <Image src={recipe.user.profileImage} alt="" />
                                        <p>{recipe.user.username}</p>
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
                                    <Image src={dubaiChoko} alt="" />
                                    <h2 className="text-[27px] font-bold mt-4">{recipe.title}</h2>
                                    <p className="text-[23px] my-[18px] font-medium">{recipe.caption}.</p>
                                    <div className="text-[20px] text-black/66 font-medium">
                                        {new Date(recipe.createdAt).toLocaleDateString()}
                                    </div>

                                </div>
                            </>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="" height={800} width={519} />
                </div>
            </div>
        </section>
    );
}
