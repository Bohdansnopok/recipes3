import Image from "next/image";
import povar from "../../../public/povar.png"
import whiskAndBowl from "../../../public/whisk-and-bowl.svg"
import star from "../../../public/Star.svg"
import starNotFilled from "../../../public/starNotFilled.svg"
import picture from "../../../public/pictureIcon.svg"

export default function Create() {
    return (
        <section>
            <div className="container flex items-start justify-between gap-[164px] w-full">
                <div className="bg-[#FCE2CE] py-10 px-[40px] rounded-[10px]">
                    <form className="bg-white py-5 w-full px-[45px]">
                        <div className="text-center flex flex-col gap-2">
                            <h1>Add Recipe</h1>
                            <p className="text-[27px] text-black/70">Share your fovorite receipts with others</p>
                        </div>

                        <div className="relative">
                            <label className="text-[27px] text-black/70 block mt-7">Receipt Title</label>
                            <Image src={whiskAndBowl} alt="" className="absolute top-[75px] left-[27px]" />
                            <input type="text" placeholder="Enter receipt title" className=" w-full border border-green-700 rounded-[10px] mt-4 py-4 px-[74px] block placeholder:text-[27px] placeholder:text-black/70 text-[27px] text-black/70" />
                        </div>

                        <div className="relative">
                            <label className="text-[27px] text-black/70 block mt-7">Your Rating</label>
                            <div className=" w-full flex items-center justify-between  border border-green-700 rounded-[10px] mt-4
                                     py-4 px-[40px]">
                                <button><Image src={star} alt="" height={34} width={34} /></button>
                                <button><Image src={star} alt="" height={34} width={34} /></button>
                                <button><Image src={star} alt="" height={34} width={34} /></button>
                                <button><Image src={star} alt="" height={34} width={34} /></button>
                                <button><Image src={starNotFilled} alt="" height={34} width={34} /></button>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-[27px] text-black/70 block mt-7">Receipt Title</label>
                            <textarea placeholder="Write your review or thoughts about this receipt..."
                                className="border border-green-700 w-full min-h-[152px]
                                rounded-[10px] mt-4 py-4 px-6 block placeholder:text-[27px] placeholder:text-black/70 
                                text-[27px] text-black/70" />
                        </div>

                        <div>
                            <div className="text-[27px] text-black/70 block mt-7">Receipt Image</div>

                            <label className="flex flex-col mt-6 items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Image src={picture} alt="" className="w-10 h-10 mb-3 opacity-60" />
                                    <p className="mb-2 text-sm text-gray-500">Tap to select image</p>
                                </div>
                                <input type="file" className="hidden" />
                            </label>
                        </div>

                        <div className="flex justify-center w-full mt-6">
                            <button type="submit" className="border border-black rounded-[10px] cursor-pointer bg-[#EF8C6D] w-[316px] text-black/70 text-center text-[25px] font-bold">Create</button>
                        </div>
                    </form>
                </div>

                <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                    <Image src={povar} alt="" height={800} width={519} />
                </div>
            </div>
        </section >
    );
}
