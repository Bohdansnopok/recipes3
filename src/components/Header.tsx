import Image from "next/image";
import logo from "../../public/logo.svg"
import CustomNavLink from "./CustomNavLink";

export default function Header() {
    return (
        <header className="mb-20">
            <div className="container flex items-center justify-between text-[25px] ">
                <div className="flex items-center gap-4">
                    <Image src={logo} alt="" />
                    <div className="font-bold">Full Stack Receipt</div>
                </div>
                <div className="flex items-center gap-30">
                    <CustomNavLink href="/">All Receipts</CustomNavLink>
                    <CustomNavLink href="/create">Create Receipt</CustomNavLink>
                    <CustomNavLink href="/profile">My Profile</CustomNavLink>
                </div>
                <div className="flex items-center gap-12">
                    <CustomNavLink href="/signIn">Login</CustomNavLink>
                    <CustomNavLink href="/signUp">Sign up</CustomNavLink>
                </div>
            </div>
        </header>
    );
}
