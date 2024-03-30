import { SelectStyles } from "@/Components/SelectInputStyles";
import Select from "react-select";
import MainLayout from "@/Layouts/MainLayout";
import { Link, router, useForm } from "@inertiajs/react";
import React from "react";
import Hr from "@/Components/Hr";
import { useState } from "react";

const BlockDetails = ({ auth, block }) => {
    const [room, setRoom] = useState(null);

    // CRUD
    const deleteRoom = () => {
        router.delete(route("rooms.destroy", room));
    };

    return (
        <MainLayout user={auth.user} pageTitle={"Block Details"}>
            <div className="mb-5">
                <Link
                    href={route("blocks.index")}
                    class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
                >
                    <svg
                        class="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M5 12h14M5 12l4-4m-4 4 4 4"
                        />
                    </svg>
                </Link>
            </div>

            <div class="py-8 px-4 mx-auto border border-blue-100 rounded-md">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <Link
                        href={route("blocks.edit", block)}
                        class="inline-flex items-center px-5 py-2.5  text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        Edit Block
                    </Link>
                </div>

                <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul
                        class="flex flex-wrap -mb-px text-sm font-medium text-center"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg"
                                id="create-leave-details-tab"
                                data-tabs-target="#create-leave-details"
                                type="button"
                                role="tab"
                                aria-controls="create-leave-details"
                                aria-selected="false"
                            >
                                Block Details
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="default-tab-content">
                    <div
                        class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="create-leave-details"
                        role="tabpanel"
                        aria-labelledby="create-leave-details-tab"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex gap-2">
                                <h1 className="block text-gray-700 dark:text-gray-300 text-lg font-bold">
                                    Block Name: {block.name}
                                </h1>
                            </div>
                        </div>
                        <Hr />

                        <div class="grid gap-4 sm:grid-cols-4 sm:gap-6">
                            {block.rooms.map((room, index) => (
                                <div className="w-full border p-4 flex flex-col items-center space-y-10">
                                    <div className="flex flex-col items-center space-y-2">
                                        <h6 className="capitalize text-xl font-bold text-center">
                                            {index + 1}.{room.number}
                                        </h6>

                                        <p className="font-semibold">
                                            Capacity: {room.capacity}
                                        </p>

                                        <p className="font-semibold">
                                            Status:{" "}
                                            <span
                                                class={`${
                                                    room.status === "open"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                                } text-xs font-medium me-2 px-2.5 py-0.5 rounded`}
                                            >
                                                {room.status}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="flex flex-row justify-center items-center space-x-4">
                                        <Link
                                            href={route("checkins.create", {
                                                room_id: room.id,
                                            })}
                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-900"
                                        >
                                            Book
                                        </Link>

                                        <Link
                                            href={route("rooms.edit", room)}
                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-500 dark:hover:bg-primary-600 dark:focus:ring-primary-900"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => setRoom(room)}
                                            data-modal-target="deleteModal"
                                            data-modal-toggle="deleteModal"
                                            type="button"
                                            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

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
                                Deleting this also deletes all data related to
                                this room on the system.
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
                                    onClick={() => deleteRoom()}
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
            </div>
        </MainLayout>
    );
};

export default BlockDetails;
