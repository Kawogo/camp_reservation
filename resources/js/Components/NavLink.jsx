import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                active
                    ? "flex items-center p-2 text-gray-900 bg-primary-100 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            }
        >
            {children}
        </Link>
    );
}
