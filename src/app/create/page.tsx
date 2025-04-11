"use client"

import Image from "next/image";
import povar from "../../../public/povar.png"
import whiskAndBowl from "../../../public/whisk-and-bowl.svg"
// import star from "../../../public/Star.svg"
// import starNotFilled from "../../../public/starNotFilled.svg"
import picture from "../../../public/pictureIcon.svg"
import { useForm } from "react-hook-form";
// import { addRecipe } from '../../utils/addRecipe';
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

type CreateRecipe = {
    title: string;
    caption: string;
    rating: number;
    image?: string | null;
}

export default function Create() {
    const { register, formState: { errors, isValid }, handleSubmit, reset } = useForm<CreateRecipe>();
    const [image, setImage] = useState<File | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [data, setData] = useState<CreateRecipe>({
        title: "",
        caption: "",
        rating: 0,
    })

    // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { title, value } = e.target;

    //     if (title === "title") {
    //         setData((prevData) => ({
    //             ...prevData,
    //         }));
    //     } else {
    //         setData((prevData) => ({ ...prevData, [title]: value }));
    //     }
    // };

    // const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setRating(Number(e.target.value));
    // };




    const onSubmit = async (formData: CreateRecipe) => {

        if (!formData.title || !formData.caption || rating === 0) {
            toast.error("Please fill in all fields!");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("No token found! You need to be logged in.");
            return;
        }


        const sendPayload = async (payload: CreateRecipe) => {
            try {
                const response = await axios.post("https://recipe-yt.onrender.com/api/recipes", payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("Data sent successfully:", response.data);
                if (response.status === 201) {
                    // Сброс формы и состояний после успешной отправки
                    setImage(null);
                    setRating(0);
                    reset();
                    toast.success("You add your Recipe, please wait");
                }
            } catch (e: unknown) {
                if (e instanceof AxiosError) {
                    console.error("Error sending data:", e.response ? e.response.data : e.message);
                } else {
                    console.error("Unknown error:", e);
                }
                toast.error("There was an error sending your data.");
            }
        };

        // Обрабатываем изображение, если оно выбрано
        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                const base64Image = reader.result as string;
                const payload: CreateRecipe = {
                    title: formData.title,
                    caption: formData.caption,
                    rating: rating, // используем значение рейтинга из состояния
                    image: base64Image,
                };
                console.log("Payload:", payload);
                await sendPayload(payload);
            };
        } else {
            const payload: CreateRecipe = {
                title: formData.title,
                caption: formData.caption,
                rating: rating,
                image: null,
            };
            console.log("Payload:", payload);
            await sendPayload(payload);
        }
    };


    return (
        <section>
            <div className="container flex items-end justify-between gap-[164px] w-full">
                <div className="bg-[#FCE2CE] py-10 px-[40px] rounded-[10px]">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white py-5 w-full px-[45px]">
                        <div className="text-center flex flex-col gap-2">
                            <h1>Add Recipe</h1>
                            <p className="text-[27px] text-black/70">Share your favorite recipes with others</p>
                        </div>

                        <div className="relative">
                            <label className="text-[27px] text-black/70 block mt-7">Receipt Title</label>
                            <Image src={whiskAndBowl} alt="" className="absolute top-[75px] left-[27px]" />
                            <input {...register('title', {
                                required: "Поле обов'язкове для заповнення!"
                            })} type="text" placeholder="Enter receipt title" className="w-full border border-green-700 rounded-[10px] mt-4 py-4 px-[74px] block placeholder:text-[27px] placeholder:text-black/70 text-[27px] text-black/70" />
                        </div>

                        <div className="mt-1 text-red-500 text-[20px] font-bold">
                            <div>{errors?.title?.message}</div>
                        </div>

                        <div className="relative">
                            <label className="text-[27px] text-black/70 block mt-7">Your Rating</label>
                            <fieldset className="w-full flex items-center justify-between border border-green-700 rounded-[10px] mt-4 py-4 px-[40px]">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <React.Fragment key={num}>
                                        <input
                                            type="radio"
                                            id={`star${num}`}
                                            name="rating"
                                            value={num}
                                            onChange={() => setRating(num)}
                                            checked={rating === num}
                                            className="starInput hidden"
                                        />
                                        <label
                                            htmlFor={`star${num}`}
                                            className={`starLabel ${rating >= num ? "active" : ""}`}
                                        ></label>
                                    </React.Fragment>
                                ))}
                            </fieldset>

                        </div>

                        <div className="relative">
                            <label className="text-[27px] text-black/70 block mt-4 font-medium">Receipt Caption</label>
                            <textarea {...register('caption', {
                                required: "Поле обов'язкове для заповнення!",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи"
                                }
                            })} placeholder="Write your review or thoughts about this receipt..."
                                className="border border-green-700 w-full min-h-[152px] rounded-[10px] mt-4 py-[18px] px-6 block placeholder:text-[27px] placeholder:text-black/70 text-[27px] text-black/70" />
                        </div>

                        <div className="mt-1 text-red-500 text-[20px] font-bold">
                            <div>{errors?.caption?.message}</div>
                        </div>

                        <label
                            htmlFor="image-upload"
                            className="relative flex flex-col mt-6 items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition overflow-hidden"
                        >
                    
                            <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                            />

                            
                            {!image && (
                                <div className="flex flex-col items-center justify-center z-10">
                                    <Image
                                        src={picture}
                                        alt="select image icon"
                                        className="w-[54px] h-[54px] mb-4"
                                    />
                                    <p className="text-[22px] font-medium text-gray-500">
                                        Tap to select image
                                    </p>
                                </div>
                            )}

                     
                            {image && (
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt="uploaded-preview"
                                    fill // <-- делает width+height = 100% и позиционирует absolutely
                                    className="object-cover"
                                />
                            )}
                        </label>

                        <div className="mt-1 text-red-500 text-[20px] font-bold">
                            <div>{errors?.Image?.message}</div>
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
        </section>
    );
}