import { SelectStyles } from "@/Components/SelectInputStyles";
import Select from "react-select";
import MainLayout from "@/Layouts/MainLayout";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

const EditMember = ({ auth, response }) => {
    console.log(response);
    const { data, setData, put, processing, errors, reset } = useForm({
        name: response.member.name,
        id_number: response.member.id_number,
        type: response.member.type,
        phone: response.member.phone,
        company_id: response.member.company.id,
        department_id: response.member.department.id,
        camp_id: response.member.camp.id,
        block_id: response.member.block.id,
        room_id: response.member.room.id,
    });

    const companiesOpts = response.companies.map(function (company) {
        return { value: company.id, label: company.name };
    });

    const departmentsOpts = response.departments
        .filter((item) => item.company_id === data.company_id)
        .map(function (depart) {
            return { value: depart.id, label: depart.name };
        });

    const campsOpts = response.camps
        .filter((item) => item.company_id === data.company_id)
        .map(function (camp) {
            return { value: camp.id, label: camp.name };
        });

    const blocksOpts = response.blocks
        .filter((item) => item.camp_id === data.camp_id)
        .map(function (block) {
            return { value: block.id, label: block.name };
        });

    const roomsOpts = response.rooms
        .filter((item) => item.block_id === data.block_id)
        .map(function (room) {
            return { value: room.id, label: room.number };
        });

    function submit(e) {
        e.preventDefault();
        put(route("members.update", { member: response.member }));
    }

    return (
        <MainLayout
            user={auth.user}
            pageTitle={`Edit Member - ${response.member.name.toUpperCase()}`}
        >
            <div className="mb-5">
                <Link
                    href={route("members.index")}
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
                            Update Member
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
                                    Member Details
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
                            <div class="grid gap-4 sm:grid-cols-3 sm:gap-6">
                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Member Name
                                    </label>
                                    <input
                                        defaultValue={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        type="text"
                                        name="name"
                                        id="name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Member name"
                                        required=""
                                    />
                                    {errors.name && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Type
                                    </label>
                                    <Select
                                        defaultValue={{
                                            value: data.type,
                                            label:
                                                data.type[0].toUpperCase() +
                                                data.type.substring(1),
                                        }}
                                        options={[
                                            {
                                                value: "permanent",
                                                label: "Permanent",
                                            },
                                            {
                                                value: "tempo",
                                                label: "Temporary",
                                            },
                                        ]}
                                        onChange={(choice) =>
                                            setData("type", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.type && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        ID Number
                                    </label>
                                    <input
                                        defaultValue={data.id_number}
                                        onChange={(e) =>
                                            setData("id_number", e.target.value)
                                        }
                                        type="text"
                                        name="id_number"
                                        id="id_number"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Member number"
                                        required=""
                                    />
                                    {errors.id_number && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.id_number}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        defaultValue={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Member phone"
                                        required=""
                                    />
                                    {errors.phone && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Company
                                    </label>
                                    <Select
                                        defaultValue={companiesOpts.find(
                                            (item) =>
                                                item.value === data.company_id
                                        )}
                                        options={companiesOpts}
                                        onChange={(choice) =>
                                            setData("company_id", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.company_id && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.company_id}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Department
                                    </label>
                                    <Select
                                        defaultValue={departmentsOpts.find(
                                            (item) =>
                                                item.value ===
                                                data.department_id
                                        )}
                                        options={departmentsOpts}
                                        onChange={(choice) =>
                                            setData(
                                                "department_id",
                                                choice.value
                                            )
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.department_id && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.department_id}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Camp
                                    </label>
                                    <Select
                                        defaultValue={campsOpts.find(
                                            (item) =>
                                                item.value === data.camp_id
                                        )}
                                        options={campsOpts}
                                        onChange={(choice) =>
                                            setData("camp_id", choice.value)
                                        }
                                        styles={SelectStyles}
                                    />
                                    {errors.camp_id && (
                                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.camp_id}
                                        </p>
                                    )}
                                </div>

                                <div class="w-full">
                                    <label
                                        for="employment_type"
                                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Block
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
                                        Room
                                    </label>
                                    <Select
                                        defaultValue={roomsOpts.find(
                                            (item) =>
                                                item.value === data.room_id
                                        )}
                                        options={roomsOpts}
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
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
};

export default EditMember;