"use client"

import Image from "next/image";
import povar from "../../../public/povar.png"
import whiskAndBowl from "../../../public/whisk-and-bowl.svg"
import star from "../../../public/Star.svg"
import starNotFilled from "../../../public/starNotFilled.svg"
import picture from "../../../public/pictureIcon.svg"
import { useForm } from "react-hook-form";
import { addRecipe } from '../../utils/addRecipe';
import { useState } from "react";

export default function Create() {
    const [rating, setRating] = useState<number>(0);

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(Number(e.target.value));
    };

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();

            // Додаємо інші дані
            formData.append('title', data.title);
            formData.append('caption', data.caption);
            formData.append('image', data.Image[0]);
            formData.append('rating', String(rating));

            const token = localStorage.getItem('token') || '';
            console.log('hello world')
            const result = await addRecipe(formData, token);
            console.log('Рецепт успішно додано:', result);

            reset();
        } catch (error) {
            console.error('Помилка при надсиланні рецепта:', error);
            if (error instanceof Error) {
                alert(`Error: ${error.message}`);
            }
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
                                <input type="radio" id="star1" name="rating" value="rating" className="starInput" onChange={() => setRating(1)} checked={rating === 1} />
                                <label htmlFor="star1" className={`starLabel ${rating >= 1 ? 'active' : ''}`}></label>

                                <input type="radio" id="star2" name="rating" value="rating" className="starInput" onChange={() => setRating(2)} checked={rating === 2} />
                                <label htmlFor="star2" className={`starLabel ${rating >= 2 ? 'active' : ''}`}></label>

                                <input type="radio" id="star3" name="rating" value="rating" className="starInput" onChange={() => setRating(3)} checked={rating === 3} />
                                <label htmlFor="star3" className={`starLabel ${rating >= 3 ? 'active' : ''}`}></label>

                                <input type="radio" id="star4" name="rating" value="rating" className="starInput" onChange={() => setRating(4)} checked={rating === 4} />
                                <label htmlFor="star4" className={`starLabel ${rating >= 4 ? 'active' : ''}`}></label>

                                <input type="radio" id="star5" name="rating" value="rating" className="starInput" onChange={() => setRating(5)} checked={rating === 5} />
                                <label htmlFor="star5" className={`starLabel ${rating >= 5 ? 'active' : ''}`}></label>
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

                        {/* Інпут для вибору картинки */}
                        <div>
                            <div className="text-[27px] text-black/70 block mt-[34px]">Receipt Image</div>
                            <label className="flex flex-col mt-6 items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                <div className="flex flex-col items-center justify-center">
                                    <Image src={picture} alt="" className="w-[54px] h-[54px] mb-4" />
                                    <p className="text-[22px] font-medium text-gray-500">Tap to select image</p>
                                </div>
                                <input
                                    {...register('Image', { required: "Будь ласка, виберіть зображення!" })}
                                    type="file"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="mt-1 text-red-500 text-[20px] font-bold">
                            <div>{errors?.Image?.message}</div>
                        </div>

                        <div className="flex justify-center w-full mt-6">
                            <button type="submit" disabled={!isValid} className="border border-black rounded-[10px] cursor-pointer bg-[#EF8C6D] w-[316px] text-black/70 text-center text-[25px] font-bold">Create</button>
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