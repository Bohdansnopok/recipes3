"use client"
import Image from "next/image";
import povar from "../../../public/povar.png"
import mailIcon from "../../../public/mailIcon.svg"
import passwordLock from "../../../public/lockPasswordIcon.svg"
import viewOff from "../../../public/viewOffSlash.svg"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/AuthStore";
import { loginSchema, LoginSchemaType } from "@/zodSchems/loginSchem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function SingIn() {
    const { signIn } = useAuthStore();
    const router = useRouter();
    const { register, formState: { errors }, handleSubmit } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            variant: 'signIn',
            email: '',
            password: '',
        },
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            alert(`Logged in successfully`);
            router.push("/");
            queryClient.invalidateQueries({ queryKey: ['singIn'] });
        },
        onError: (error: Error) => {
            alert(error.message);
        },
    })

    const handleSignIn: SubmitHandler<LoginSchemaType> = async (data: { email: string; password: string }) => {
        mutation.mutate(data)
    }

    return (
        <section className="flex items-center justify-between gap-[150px] container ">
            <form className="w-[540px]" onSubmit={handleSubmit(handleSignIn)}>
                <h1 className="text-[#424242] mb-16 text-center">Welcome Back!!</h1>
                <div className="flex flex-col gap-12">
                    <div className="relative">
                        <label htmlFor="email" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] top-[-13px] px-4">Email</label>
                        <Image src={mailIcon} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("email", { required: true })}
                            defaultValue=""
                        />
                        {errors.email && <p className="text-red-500 my-5">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] top-[-13px] px-4">Password</label>
                        <Image src={passwordLock} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("password", { required: true })}
                            defaultValue=""
                        />
                        {errors.password && <p className="text-red-500 my-5">{errors.password.message}</p>}
                        <button type="button">
                            <Image src={viewOff} alt="" className="absolute block top-6 right-[30px]" />
                        </button>
                    </div>
                </div>

                <div className="text-[20px] font-semibold text-[#616161] text-right">
                    Forgot Password?
                </div>

                <div className="flex flex-col  items-center">
                    <button type="submit" className="form-button w-full">Login</button>
                    <span className="text-black/50 mb-8">- or -</span>
                    <div className="flex items-center text-[18px] text-black/50">
                        Already have an account?
                        <Link href="/signUp" className="font-semibold text-[#C3824E] block ml-1">Sign up</Link>
                    </div>
                </div>
            </form>

            <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                <Image src={povar} alt="" height={800} width={519} />
            </div>
        </section>
    )
}