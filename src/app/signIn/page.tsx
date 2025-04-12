import { Metadata } from "next";
import Image from "next/image";
import povar from "../../../public/povar.png"
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
    title: "SignIn Page | Next App",
    description: "SignIn to your Next App account securely.",
};

export default function SignIn() {
    return (
        <section className="flex items-center justify-between gap-[150px] container ">
            <SignInForm />
            <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                <Image src={povar} alt="Smiling chef in uniform" height={800} width={519} />
            </div>
        </section>
    )
}