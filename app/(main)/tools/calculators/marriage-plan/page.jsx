"use client";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import axios from "axios";
import { calculators } from "@/data/calculators";
import { useRouter } from "next/navigation";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

export default function MarriagePlanningCalculator() {
    const router = useRouter();
    const [currentAge, setCurrentAge] = useState(10); // Current age of the child
    const [MarriageStartAge, setMarriageStartAge] = useState(18); // Age at which Marriage starts
    const [totalInvestment, setTotalInvestment] = useState(500000); // Current Marriage cost
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate in %

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

    const calculateMarriagePlan = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/marriage-calculator?currentAge=${currentAge}&marriageAge=${MarriageStartAge}&totalInvestment=${totalInvestment}&expectedReturn=${expectedReturn}&inflationRate=${inflationRate}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (res.status === 200) {
                const data = res.data
                const totalInvestment = data.totalInvestment;
                const futureMarriageCost = data.futureMarriageCost;
                const lumpsumInvestment = data.lumpsumInvestment;
                const sipInvestment = data.sipInvestment;
                const yearlyData = data.yearlyData;
                setResult({
                    totalInvestment,
                    futureValue: Math.round(futureMarriageCost),
                    lumpsumInvestment: Math.round(lumpsumInvestment),
                    sipInvestment: Math.round(sipInvestment),
                });
                setChartData(yearlyData);
            }
        }
        catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        calculateMarriagePlan();
    }, [currentAge, MarriageStartAge, totalInvestment, expectedReturn, inflationRate]);
    const handleCalculatorChange = (e) => {
        const selectedRoute = e.target.value;
        if (selectedRoute) {
            router.push(selectedRoute); // Navigate to selected route
        }
    };

    return (
         <div className="">
              <RvBreadcrumbs
                maintitle="Tools"
                maintitleLink='/tools/calculators'
                lastTitle='Calculators'
                lastTitleLink='/tools/calculators'
                lastTitle2='Marriage Planning Calculator'
            />
        <div  className="max-w-screen-xl mx-auto main_section section">
        <div className="">
            <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between">
            <b className="text-2xl md:text-3xl font-bold uppercase">
                            Marriage Planning Calculator
                        </b>
                <div className="flex justify-between gap-4">
                    <span>Explore other calculators</span>
                    <select
                        className="w-full border border-gray-500 rounded-lg p-2"
                        onChange={handleCalculatorChange}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select
                        </option>
                        {calculators.map((calc) => (
                            <option key={calc.title} value={calc.route}>
                                {calc.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    {/* Current Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <b>Current Age</b>
                                            <input
                                                type="number"
                                                value={currentAge}
                                                onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
  type="range"
  min="1"
  max="30"
  step="1"
  value={currentAge}
  onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((currentAge - 1) / (30 - 1)) * 100}%`
  }}
/>

                                    </div>
                                    {/* Marriage Start Age */}
                                    <div className='items-center mt-5 mb-5'>
                                        <div className='flex justify-between'>
                                            <b>Age at the Start of Marriage</b>
                                            <input
                                                type="number"
                                                value={MarriageStartAge}
                                                onChange={(e) => setMarriageStartAge(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
  type="range"
  min="10"
  max="50"
  step="1"
  value={MarriageStartAge}
  onChange={(e) => setMarriageStartAge(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((MarriageStartAge - 10) / (50 - 10)) * 100}%`
  }}
/>

                                    </div>
                                    {/* Current Marriage Cost */}
                                    <div>
                                        <div className='flex justify-between'>
                                            <b>Current Marriage Expenses</b>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="number"
                                                    value={totalInvestment}
                                                    onChange={(e) => setTotalInvestment(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                       <Input
  type="range"
  min="100000"
  max="10000000"
  step="1000"
  value={totalInvestment}
  onChange={(e) => setTotalInvestment(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((totalInvestment - 100000) / (10000000 - 100000)) * 100}%`
  }}
/>

                                    </div>
                                    {/* Rate of Return */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <b>Rate of Return (%)</b>
                                            <input
                                                type="number"
                                                value={expectedReturn}
                                                onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
  type="range"
  min="1"
  max="30"
  step="1"
  value={expectedReturn}
  onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((expectedReturn - 1) / (30 - 1)) * 100}%`
  }}
/>

                                    </div>
                                    {/* Inflation Rate */}
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <b>Inflation Rate (%)</b>
                                            <input
                                                type="number"
                                                value={inflationRate}
                                                onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                        <Input
  type="range"
  min="1"
  max="30"
  step="1"
  value={inflationRate}
  onChange={(e) => setInflationRate(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((inflationRate - 1) / (30 - 1)) * 100}%`
  }}
/>

                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Current Marriage Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Future Marriage Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.futureValue?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through Lumpsum</p>
                                            <p className='font-bold text-lg'>₹{result?.lumpsumInvestment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Planning Through SIP</p>
                                            <p className='font-bold text-lg'>₹{result?.sipInvestment?.toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className="mb-3">
                                <SippieChart
                                    piedata={result}
                                    title={'Marriage Planning Projection'}
                                    customLabels={{
                                        invested: "Current Expenses",
                                        return: "Future Expenses",
                                    }}
                                />
                            </div>
                            <div>
                                <CalculatorReturnChart
                                    title={"Marriage Plan"}
                                    data={chartData}
                                    chartType='line'
                                    customLabels={{
                                        xLabel: "Age",
                                        yLabel: "Amount",
                                    }}
                                    chartTitle="Marriage Planning Projection"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}
