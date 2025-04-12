import Image from "next/image";
import { Metadata } from "next";
import React from "react";
import CreateRecipeContent from "@/components/CreateContent";
import povar from "../../../public/povar.png";

export const metadata: Metadata = {
  title: "Create Recipe | Next App",
  description: "Create a new recipe and share your culinary creations on Next App.",
};

export default function Create() {
    return (
        <section>
            <div className="container flex items-end justify-between gap-[164px] w-full">
                <CreateRecipeContent />
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="Illustration of a chef" height={800} width={519} />
                </div>
            </div>
        </section>
    );
}
