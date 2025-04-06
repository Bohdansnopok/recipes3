"use client"
import Image from "next/image";
import povar from "../../../public/povar.png"
import mailIcon from "../../../public/mailIcon.svg"
import passwordLock from "../../../public/lockPasswordIcon.svg"
import viewOff from "../../../public/viewOffSlash.svg"
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SignInProps = {
    email: string;
    password: string
}


export default function SingIn() {
    const {signIn} = useAuthStore();
    const { register, handleSubmit } = useForm<SignInProps>();
    const router = useRouter();

    
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: signIn,
        onSuccess: () => {
            alert(`Logged in successfully`);
            router.push("/")
            
            queryClient.invalidateQueries({ queryKey: ['login'] });
        },
        onError: (error: Error) => {
            alert(error.message);
            // Handle error (show error message to the user)
        },
    })

    const SignIn = (data: { email: string; password: string }) => {
        mutation.mutate(data)
    }


    return (
        <section className="flex items-center justify-between gap-[150px] container ">
            <form className="w-[540px]" onSubmit={handleSubmit(SignIn)}>
                <h1 className="text-[#424242] mb-16 text-center">Welcome Back!!</h1>
                <div className="flex flex-col gap-12">
                    <div className="relative">
                        <label htmlFor="email" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[58px] px-4">Email</label>
                        <Image src={mailIcon} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="email"
                            placeholder="email@gmail.com"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="absolute text-[20px] text-[#757575] font-semibold bg-white left-[56px] bottom-[85px] px-4">Password</label>
                        <Image src={passwordLock} alt="" className="absolute block top-5 left-[30px]" />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="rounded-[64px] border border-[#757575] py-5 px-[76px] block
                            w-full placeholder:text-[22px] placeholder:text-[#616161] text-[22px]"
                            {...register("password", { required: true })}
                        />
                        {/* <button type="button" onClick={ShowPassword}> */}
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
                        <a href="#" className="font-semibold text-[#C3824E] block ml-1">Sign up</a>
                    </div>
                </div>
            </form>

            <div className="bg-[#FCE2CE] pt-[132px] pl-8 rounded-t-[394px]">
                <Image src={povar} alt="" height={800} width={519} />
            </div>
        </section>
    )
}