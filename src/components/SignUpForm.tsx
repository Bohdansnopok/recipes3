"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserStore } from "@/store/UserStore";
import { signUpSchema, SignUpSchemaType } from "@/zod/Schema";
import mailIcon from "../../public/mailIcon.svg";
import phone from "../../public/smartPhoneIcon.svg";
import passwordLock from "../../public/lockPasswordIcon.svg";
import viewOff from "../../public/viewOffSlash.svg";


export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const { signUp } = UserStore();
    const router = useRouter();
    const queryClient = useQueryClient();
    const { register, handleSubmit } = useForm<SignUpSchemaType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            variant: 'signUp',
        }
    })

    const mutation = useMutation({
        mutationFn: signUp,
        onSuccess: () => {
            toast.success(`Sign Up  successfully`);
            router.replace("/signIn")
            queryClient.invalidateQueries({ queryKey: ['signUp'] });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })

    const handleSignUp: SubmitHandler<SignUpSchemaType> = (data: { username: string; email: string; password: string }) => {
        mutation.mutate(data)
    }
    return (
        < form className="w-[540px]" onSubmit={handleSubmit(handleSignUp)} >
            <h1 className="text-[#424242] mb-16 text-center">Create Account</h1>
            <div className="flex flex-col gap-12">
                <div className="relative">
                    <label htmlFor="username" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Username</label>
                    <Image src={phone} alt="Phone icon" className="absolute block top-5 left-[30px]" />
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                        {...register("username", { required: true })}
                    />
                </div>

                <div className="relative">
                    <label htmlFor="email" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Email</label>
                    <Image src={mailIcon} alt="Email icon" className="absolute block top-5 left-[30px]" />
                    <input
                        type="email"
                        placeholder="email@gmail.com"
                        className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                        {...register("email", { required: true })}
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[85px] px-4">Password</label>
                    <Image src={passwordLock} alt="show-password icon" className="absolute block top-5 left-[30px]" />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                        {...register("password", { required: true })}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        <Image src={viewOff} alt="Toggle password visibility" className="absolute block top-6 right-[30px] cursor-pointer" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col  items-center">
                <button type="submit" className="form-button w-full">Create Account</button>
                <span className="text-black/50 mb-8">- or -</span>
                <div className="flex items-center text-[18px] text-black/50">
                    Already have an account?
                    <Link href="/signIn" className="font-semibold text-[#C3824E] block ml-1">Sign in</Link>
                </div>
            </div>
        </form >
    )
}