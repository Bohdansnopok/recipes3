"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react'

type CustomNavLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const CustomNavLink = ({ href, children, className = '' }: CustomNavLinkProps) => {
    const pathName = usePathname();
    const isActive = href !== '/' ? pathName.startsWith(href) : pathName === '/';

    return (
        <Link
            href={href}
            prefetch={true}
            className={`
                text-[27px] font-medium transition-colors duration-300 
                ${isActive ? "text-[#D9A982]" : "text-black hover:text-[#D9A982]"}
                ${className}
            `}
        >
            {children}
        </Link>
    )
}

export default CustomNavLink;
