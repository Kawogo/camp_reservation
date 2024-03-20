import ThisMonthCheckinsTable from "@/Components/ThisMonthCheckinsTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

import ApexCharts from "apexcharts";

export default function Dashboard({ auth, response }) {
    // Function to calculate the sum of males and females in each block

    // [
    //     {
    //         id: 1,
    //         name: "Sed culpa dolorem totam.",
    //         members: [
    //             {
    //                 id: 1,
    //                 gender: "male",
    //                 block_id: 1,
    //             },
    //             {
    //                 id: 2,
    //                 gender: "male",
    //                 block_id: 1,
    //             },
    //         ],
    //     },
    // ];

    // let series = []; // Define an empty array to store the series data

    // response.memberBlock.forEach(function (block) {
    //     let male = 0;
    //     let female = 0;
    //     const blockName = block.name;
    //     let xdata = [];

    //     block.members.forEach(function (member) {
    //         if (member.gender === "male") {
    //             male += 1;
    //         } else {
    //             female += 1;
    //         }

    //         xdata.push({
    //             x: blockName,
    //             y: member.gender === "male" ? male : female,
    //         });

    //         // Push the series data for male
    //         if (member.gender === "male") {
    //             series.push({
    //                 name: "Male",
    //                 color: "#1A56DB",
    //                 data: xdata.filter((item) => item.y % 2 === 0), // filtering data for males
    //             });
    //         }
    //     });

    //     // Push the series data for male
    //     series.push({
    //         name: "Male",
    //         color: "#1A56DB",
    //         data: xdata.filter((item) => item.y % 2 === 0), // filtering data for males
    //     });

    //     // Push the series data for female
    //     series.push({
    //         name: "Female",
    //         color: "#FDBA8C",
    //         data: xdata.filter((item) => item.y % 2 !== 0), // filtering data for females
    //     });
    // });

    // console.log(series); // Output the generated series data

    // const options = {
    //     colors: ["#1A56DB", "#FDBA8C"],
    //     series: series,
    //     chart: {
    //         type: "bar",
    //         height: "320px",
    //         fontFamily: "Inter, sans-serif",
    //         toolbar: {
    //             show: false,
    //         },
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             columnWidth: "70%",
    //             borderRadiusApplication: "end",
    //             borderRadius: 8,
    //         },
    //     },
    //     tooltip: {
    //         shared: true,
    //         intersect: false,
    //         style: {
    //             fontFamily: "Inter, sans-serif",
    //         },
    //     },
    //     states: {
    //         hover: {
    //             filter: {
    //                 type: "darken",
    //                 value: 1,
    //             },
    //         },
    //     },
    //     stroke: {
    //         show: true,
    //         width: 0,
    //         colors: ["transparent"],
    //     },
    //     grid: {
    //         show: false,
    //         strokeDashArray: 4,
    //         padding: {
    //             left: 2,
    //             right: 2,
    //             top: -14,
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     legend: {
    //         show: false,
    //     },
    //     xaxis: {
    //         floating: false,
    //         labels: {
    //             show: true,
    //             style: {
    //                 fontFamily: "Inter, sans-serif",
    //                 cssClass:
    //                     "text-xs font-normal fill-gray-500 dark:fill-gray-400",
    //             },
    //         },
    //         axisBorder: {
    //             show: false,
    //         },
    //         axisTicks: {
    //             show: false,
    //         },
    //     },
    //     yaxis: {
    //         show: false,
    //     },
    //     fill: {
    //         opacity: 1,
    //     },
    // };

    // if (
    //     document.getElementById("gender-block-chart") &&
    //     typeof ApexCharts !== "undefined"
    // ) {
    //     const chart = new ApexCharts(
    //         document.getElementById("gender-block-chart"),
    //         options
    //     );
    //     chart.render();
    // }

    return (
        <MainLayout user={auth.user} pageTitle={"Dashboard"}>
            <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-1">
                <div className="bg-white w-full border p-4 rounded-lg flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400">
                            Departments
                        </span>
                        <span className="text-lg font-semibold text-red-600">
                            {response.totalDepartments}
                        </span>
                    </div>
                    <div className="bg-white border p-4 rounded-md">
                        <svg
                            class="w-4 h-4 text-red-600 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"
                            />
                        </svg>
                    </div>
                </div>
                <div className="bg-white w-full border p-4 rounded-lg flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400">
                            Camps
                        </span>
                        <span className="text-lg font-semibold text-green-600">
                            {response.totalCamps}
                        </span>
                    </div>
                    <div className="bg-white border p-4 rounded-md">
                        <svg
                            class="w-5 h-5 text-green-600 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m4 12 8-8 8 8M6 10.5V19c0 .6.4 1 1 1h3v-3c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3h3c.6 0 1-.4 1-1v-8.5"
                            />
                        </svg>
                    </div>
                </div>
                <div className="bg-white w-full border p-4 rounded-lg flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-400">
                            Members
                        </span>
                        <span className="text-lg font-semibold text-blue-600">
                            {response.totalMembers}
                        </span>
                    </div>
                    <div className="bg-white border p-4 rounded-md">
                        <svg
                            class="w-5 h-5 text-blue-600 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-width="2"
                                d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* <div className="mt-10">
                <h2 className="text-xs font-bold text-gray-700 dark:text-white">
                    Quick Reports
                </h2>
                <hr class="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <form>
                    <div className="grid gap-4 lg:grid-cols-5 sm:grid-cols-1">
                        <div className="w-full">
                            <input
                                type="date"
                                name="from_date"
                                id="from_date"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="From"
                                required=""
                            />
                        </div>
                        <button className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 font-xs rounded-md px-2 text-xs py-1.5 dark:bg-primary-600 dark:hover:bg-primary-700">
                            Get Report
                        </button>
                    </div>
                </form>
            </div> */}
        </MainLayout>
    );
}
