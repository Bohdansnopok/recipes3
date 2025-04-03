import Image from "next/image";
import povar from "../../../public/povar.png"
import dubaiChoko from "../../../public/dubaiChocoSmall.jpg"
import avatar from "../../../public/blackAvatar.svg"
import starNotFilled from "../../../public/starNotFilled.svg"
import star from "../../../public/Star.svg"

export default function List() {
    return (
        <section>
            <div className="container flex items-end justify-between gap-[164px] w-full">
                <div className="bg-[#FCE2CE] py-10 px-[60px] rounded-[10px] max-h-[1007px] overflow-y-auto">
                    <div className="bg-white py-[10px] px-[22px]">
                        <div className="flex items-center justify-between w-full mb-[20px]">
                            <div className="flex items-center gap-3">
                                <Image src={avatar} alt="" />
                                <div>janedoe</div>
                            </div>

                            <div className="flex items-center gap-[3px]">
                                <Image src={star} alt="" />
                                <Image src={star} alt="" />
                                <Image src={star} alt="" />
                                <Image src={star} alt="" />
                                <Image src={starNotFilled} alt="" />
                                <div className="ml-2 text-[11px] text-[#7C7C7C]">(4)</div>
                            </div>
                        </div>

                        <div className="px-[23px]">
                            <Image src={dubaiChoko} alt="" />
                            <div className="text-[27px] font-bold mt-4">Double cheese burger</div>
                            <p className="text-[23px] my-5">Grill two beef patties and melt a slice of cheese...</p>
                            <div className="text-[20px] text-black/66">Shared on March 15, 2025</div>
                        </div>
                    </div>

                    
                    <div className="bg-white py-[10px] px-[22px]">
                        <div className="flex items-center justify-between w-full mb-[20px]">
                            <div className="flex items-center gap-3">
                                <Image src={avatar} alt="" />
                                <div>janedoe</div>
                            </div>

                            <div className="flex items-center gap-[3px]">
                                <Image src={star} alt="" />
                                <Image src={star} alt="" />
                                <Image src={star} alt="" />
                                <Image src={star} alt="" />
                                <Image src={starNotFilled} alt="" />
                                <div className="ml-2 text-[11px] text-[#7C7C7C]">(4)</div>
                            </div>
                        </div>

                        <div className="px-[23px]">
                            <Image src={dubaiChoko} alt="" />
                            <div className="text-[27px] font-bold mt-4">Double cheese burger</div>
                            <p className="text-[23px] my-5">Grill two beef patties and melt a slice of cheese...</p>
                            <div className="text-[20px] text-black/66">Shared on March 15, 2025</div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="" height={800} width={519}/>
                </div>
            </div>
        </section >
    );
}
