"use client";
import Link, {LinkProps} from "next/link";
import { usePathname } from "next/navigation";

interface Props extends LinkProps{
    children: React.ReactNode;
    href: string;
    activeClassName?: string;
    nonActiveClassName?: string;
    className?: string;
}

const NavLink = ({
                     children,
                     href,
                     activeClassName = "active",
                     nonActiveClassName = "",
                     className = "",
                     ...rest
                 }: Props) => {
    const pathname = usePathname();
    // const isActive = pathname.endsWith(href) || (href.includes(pathname) && pathname !== "/");
    const isActive = pathname === href;
    const newClassName = `${isActive ? activeClassName : nonActiveClassName} ${className}`;
    return (
        <Link href={href} className={newClassName} {...rest}>
            {children}
        </Link>
    );
};
export default NavLink;