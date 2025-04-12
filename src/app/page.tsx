import { Metadata } from "next";
import Image from "next/image";
import HomeContent from "@/components/HomeContent";
import povar from "../../public/povar.png"

export const metadata: Metadata = {
    title: "Home Page | Next App",
    description: "Welcome to the home page of Next App, where you can explore features, news, and updates.",
};

export default function Home() {
    return (
        <>
            <div className="container flex items-end justify-between w-full">
                <div className="bg-[#FCE2CE] py-10 px-[60px] rounded-[10px] max-h-screen overflow-y-auto w-[730px]">
                    <HomeContent />
                </div>
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="Smiling chef in uniform" height={800} width={519} />
                </div>
            </div>
        </>
    );
}