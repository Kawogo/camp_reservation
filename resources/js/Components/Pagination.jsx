import { Link } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links, from, to, total }) => {
    
    // Remove HTML entities
    links.forEach(function(item) {
        item.label = item.label.replace(/&([^;]+);/g, ''); 
    });

    return (
        <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 flex gap-2">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">
                    {from}-{to}
                </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white">
                    {total}
                </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                {links.map(({ url, label, active }, i) => {
                    return (
                        <li key={i}>
                            <Link
                                href={url}
                                className = {`${active ? "flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" : "flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`}
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Pagination;
