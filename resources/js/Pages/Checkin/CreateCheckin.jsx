import { SelectStyles } from "@/Components/SelectInputStyles";
import Select from "react-select";
import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

const CreateCheckin = ({ auth, response }) => {

    const { data, setData, post, processing, errors, reset } = useForm({
        from_date: "",
        to_date: null,
        status: "",
        member_id: null,
        room_id: response?.room_id || null,
    });

    const membersOpts = response.members.map(function (member) {
        return { value: member.id, label: member.name };
    });

    const roomOpts = response.rooms.map(function (room) {
        return { value: room.id, label: room.number };
    });

    const statusOpts = response.status
        .filter((item) => item !== "closed")
        .map(function (status) {
            return {
                value: status,
                label: status[0].toUpperCase() + status.substring(1),
            };
        });

    function submit(e) {
        e.preventDefault();
        post("/checkins");
    }

    return (
        <MainLayout user={auth.user} pageTitle={"Add New Checkin"}>
            <div className="mb-5">
                <Link
                    href={route("checkins.index")}
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
                            Save Checkin
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
                                    Checkin Details
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
                                        Member
                                    </label>
                                    <Select
                                        options={membersOpts}
                                        onChange={(choice) =>
                                            setData("member_id", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.member_id && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.member_id}
                                        </p>
                                    )}
                                </div>
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Room
                                    </label>
                                    <Select
                                        defaultValue={roomOpts.find(
                                            (item) =>
                                                item.value === response?.room_id
                                        )}
                                        options={roomOpts}
                                        onChange={(choice) =>
                                            setData("room_id", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.room_id && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.room_id}
                                        </p>
                                    )}
                                </div>
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        From
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setData("from_date", e.target.value)
                                        }
                                        type="date"
                                        name="from_date"
                                        id="from_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="From"
                                        required=""
                                    />
                                    {errors.from_date && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.from_date}
                                        </p>
                                    )}
                                </div>
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        To
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setData("to_date", e.target.value)
                                        }
                                        type="date"
                                        name="to_date"
                                        id="to_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="To"
                                        required=""
                                    />
                                    {errors.to_date && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.to_date}
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
                                        options={statusOpts}
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

export default CreateCheckin;
