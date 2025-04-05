import Image from "next/image";
import povar from "../../../public/povar.png"
import mailIcon from "../../../public/mailIcon.svg"
import phone from "../../../public/smartPhoneIcon.svg"
import passwordLock from "../../../public/lockPasswordIcon.svg"
import viewOff from "../../../public/viewOffSlash.svg"

export default function SingUp() {
    return (
        <section className="flex items-start justify-between gap-[150px] container">
            <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                <Image src={povar} alt="" height={800} width={519} />
            </div>

            <form className="w-[540px]">
                <h1 className="text-[#424242] mb-16 text-center">Create Account</h1>
                <div className="flex flex-col gap-12">
                    <div className="relative">
                        <label htmlFor="" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Email</label>
                        <Image src={mailIcon} alt="" className="absolute block top-5 left-[30px]" />
                        <input type="email" placeholder="email@gmail.com"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Username</label>
                        <Image src={phone} alt="" className="absolute block top-5 left-[30px]" />
                        <input type="text" placeholder="Enter your username"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[85px] px-4">Password</label>
                        <Image src={passwordLock} alt="" className="absolute block top-5 left-[30px]" />
                        <input type="password" placeholder="Enter your password"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                        />
                        <button>
                            <Image src={viewOff} alt="" className="absolute block top-6 right-[30px]" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-8 items-center">
                    <button type="submit" className="text-[#92613A] mt-[50px] bg-[#FCE2CE] rounded-[128px] text-2xl font-semibold py-5 w-full">Create Account</button>
                    <span className="text-black/50">- or -</span>
                    <div className="flex items-center text-[18px] text-black/50">
                        Already have an account?
                        <a href="#" className="font-semibold text-[#C3824E] block ml-1">Sign in</a>
                    </div>
                </div>
            </form>
        </section>
    )
}