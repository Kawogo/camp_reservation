import FlashMessage from "@/Components/FlashMessage";
import Pagination from "@/Components/Pagination";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const Index = ({ auth, checkouts, flash }) => {
    const [checkout, setCheckout] = useState(null);

    // CRUD
    const deleteCheckout = () => {
        router.delete(route("checkouts.destroy", checkout));
    };

    function statusStyle(status) {
        if (status === "active") {
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded";
        } else if (status === "closed") {
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded";
        } else if (status === "pending") {
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs font-medium me-2 px-2.5 py-0.5 rounded";
        }
    }

    return (
        <MainLayout user={auth.user} pageTitle={"Checkout"}>
            <div className="mx-auto max-w-screen-xl px-2 lg:px-2">
                {flash && flash.message && (
                    <FlashMessage message={flash.message} />
                )}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2 sm:w-full">
                            <form className="flex gap-2 items-center">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-1/2 md:w-1/2 sm:w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Search"
                                        required=""
                                    />
                                </div>
                                <button className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                    Search
                                </button>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Link
                                href={route("checkouts.create")}
                                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                            >
                                Add New Checkout
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        Member
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        From
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        To
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Period Offsite
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {checkouts.data.map((checkout) => {
                                    return (
                                        <tr
                                            className="border-b dark:border-gray-700"
                                            key={checkout.id}
                                        >
                                            <td className="px-4 py-3">
                                                {checkout.member.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                {checkout.leave_date}
                                            </td>

                                            <td className="px-4 py-3">
                                                {checkout.return_date}
                                            </td>

                                            <td className="px-4 py-3">
                                                {checkout.period_offsite}
                                            </td>

                                            <td className="px-4 py-3 flex items-center justify-end">
                                                <button
                                                    id={`${checkout.id}-dropdown-button`}
                                                    data-dropdown-toggle={`table-dropdown-${checkout.id}`}
                                                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                    type="button"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                </button>
                                                <div
                                                    id={`table-dropdown-${checkout.id}`}
                                                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                >
                                                    <ul
                                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                        aria-labelledby={`${checkout.id}-dropdown-button`}
                                                    >
                                                        <li>
                                                            <Link
                                                                href={route(
                                                                    "checkouts.edit",
                                                                    checkout
                                                                )}
                                                                className="block cursor-pointer py-2 px-4 text-sm text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Edit
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <span
                                                                onClick={() =>
                                                                    setCheckout(
                                                                        checkout
                                                                    )
                                                                }
                                                                data-modal-target="deleteModal"
                                                                data-modal-toggle="deleteModal"
                                                                className="block cursor-pointer py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Delete
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {/* delete modal */}
                        <div
                            id="deleteModal"
                            tabindex="-1"
                            class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
                        >
                            <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                                <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                                    <button
                                        type="button"
                                        class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        data-modal-toggle="deleteModal"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            class="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                    <svg
                                        class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <p class="mb-4 text-red-500 dark:text-red-300 font-bold">
                                        WARNING
                                    </p>
                                    <p class="mb-4 text-gray-500 dark:text-gray-300">
                                        Deleting this also deletes all data
                                        related to this checkout on the system.
                                    </p>

                                    <div class="flex justify-center items-center space-x-4">
                                        <button
                                            data-modal-toggle="deleteModal"
                                            type="button"
                                            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                        >
                                            No, cancel
                                        </button>
                                        <button
                                            onClick={() => deleteCheckout()}
                                            data-modal-hide="deleteModal"
                                            type="button"
                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        >
                                            Yes, I'm sure
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Pagination
                            links={checkouts.links}
                            from={checkouts.from}
                            to={checkouts.to}
                            total={checkouts.total}
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;
