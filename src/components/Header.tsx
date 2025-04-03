import Image from "next/image";
import logo from "../../public/logo.svg"

export default function Header() {
    return (
        <header>
            <div className="container flex items-center justify-between text-[25px] ">
                <div className="flex items-center gap-4">
                    <Image src={logo} alt="" />
                    <div className="font-bold">Full Stack Receipt</div>
                </div>
                <div className="flex items-center gap-30">
                    <a href="">All Receipts</a>
                    <a href="">Create Receipt</a>
                    <a href="">My Profile</a>
                </div>
                <div className="flex items-center gap-12">
                    <a href="">Sign up</a>
                    <a href="">Login</a>
                </div>
            </div>
        </header>
    );
}
