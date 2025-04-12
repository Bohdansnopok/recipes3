import Image from "next/image";
import { Metadata } from "next";
import ProfileContent from "@/components/ProfileContent";
import povar from "../../../public/povar.png"

export const metadata: Metadata = {
    title: "Profile Page | Next App",
    description: "View your profile and manage your settings on Next App.",
};

export default function Profile() {
    return (
        <section>
            <div className="container flex items-end justify-between gap-[164px] w-full">
                <ProfileContent />
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="Profile chef illustration" height={800} width={519} />
                </div>
            </div>
        </section >
    );
}
