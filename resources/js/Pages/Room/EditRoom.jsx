import { SelectStyles } from "@/Components/SelectInputStyles";
import Select from "react-select";
import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

const EditRoom = ({ auth, room, blocks }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        number: room.number,
        block_id: room.block_id,
        capacity: room.capacity,
        status: room.status,
    });

    const blocksOpts = blocks.map(function (block) {
        return { value: block.id, label: block.name };
    });

    function submit(e) {
        e.preventDefault();
        put(route("rooms.update", room));
    }

    return (
        <MainLayout user={auth.user} pageTitle={"Update Room"}>
            <div className="mb-5">
                <Link
                    href={route("rooms.index")}
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
                <form onSubmit={submit}>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button
                            type="submit"
                            disabled={processing}
                            class="inline-flex items-center px-5 py-2.5  text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Update Room
                        </button>
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
                                    Room Details
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
                            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Room Number
                                    </label>
                                    <input
                                        defaultValue={data.number}
                                        onChange={(e) =>
                                            setData("number", e.target.value)
                                        }
                                        type="text"
                                        name="number"
                                        id="number"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Room number"
                                        required=""
                                    />
                                    {errors.number && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.number}
                                        </p>
                                    )}
                                </div>
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Block Name
                                    </label>
                                    <Select
                                        defaultValue={blocksOpts.find(
                                            (item) =>
                                                item.value === data.block_id
                                        )}
                                        options={blocksOpts}
                                        onChange={(choice) =>
                                            setData("block_id", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.block_id && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.block_id}
                                        </p>
                                    )}
                                </div>
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Room Capacity
                                    </label>
                                    <input
                                        defaultValue={data.capacity}
                                        onChange={(e) =>
                                            setData("capacity", e.target.value)
                                        }
                                        type="number"
                                        name="capacity"
                                        id="capacity"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Room capacity"
                                        required=""
                                    />
                                    {errors.capacity && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.capacity}
                                        </p>
                                    )}
                                </div>
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Status
                                    </label>
                                    <Select
                                        defaultValue={{
                                            value: data.status,
                                            label: data.status[0].toUpperCase() + data.status.substring(1),
                                        }}
                                        options={[
                                            { value: "open", label: "Open" },
                                            { value: "full", label: "Full" },
                                        ]}
                                        onChange={(choice) =>
                                            setData("status", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.status && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default EditRoom;
