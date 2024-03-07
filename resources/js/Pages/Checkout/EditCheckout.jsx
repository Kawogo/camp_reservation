import { SelectStyles } from "@/Components/SelectInputStyles";
import Select from "react-select";
import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

const CreateCheckout = ({ auth, response }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        leave_date: response.leave_date,
        return_date: response.return_date,
        member_id: response.member_id,
    });

    const membersOpts = response.members.map(function (member) {
        return { value: member.id, label: member.name };
    });

    function submit(e) {
        e.preventDefault();
        put(route("checkouts.update", { checkout: response.checkout }));
    }

    return (
        <MainLayout user={auth.user} pageTitle={"Edit Checkout"}>
            <div className="mb-5">
                <Link
                    href={route("checkouts.index")}
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
                            Update Checkout
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
                                    Checkout Details
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
                                        defaultValue={membersOpts.find(
                                            (item) =>
                                                item.value === data.member_id
                                        )}
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
                                        From
                                    </label>
                                    <input
                                        defaultValue={data.leave_date}
                                        onChange={(e) =>
                                            setData(
                                                "leave_date",
                                                e.target.value
                                            )
                                        }
                                        type="date"
                                        name="leave_date"
                                        id="leave_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="From"
                                        required=""
                                    />
                                    {errors.leave_date && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.leave_date}
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
                                        defaultValue={data.return_date}
                                        onChange={(e) =>
                                            setData(
                                                "return_date",
                                                e.target.value
                                            )
                                        }
                                        type="date"
                                        name="return_date"
                                        id="return_date"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="To"
                                        required=""
                                    />
                                    {errors.return_date && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.return_date}
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

export default CreateCheckout;
