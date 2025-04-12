import Image from "next/image";
import { Metadata } from "next";
import SignUpForm from "@/components/SignUpForm";
import Chef from "../../../public/povar.png"

export const metadata: Metadata = {
    title: "SignUp Page | Next App",
    description: "SignUp to your Next App account securely.",
};

export default function SignUp() {
    return (
        <section className="flex items-center justify-between  container" >
            <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                <Image src={Chef} alt="Smiling chef in uniform" height={800} width={519} />
            </div>
            <SignUpForm />
        </section >
    )
}