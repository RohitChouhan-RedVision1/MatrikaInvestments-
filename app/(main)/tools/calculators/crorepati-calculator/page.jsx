"use client";
import React, { useEffect, useState } from "react";
import "chart.js/auto";

import { Input } from "@/components/ui/input";
import { SippieChart } from "@/components/charts/sippiechart";
import { CalculatorReturnChart } from "@/components/charts/calculatorReturnChart";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from '../calculator.module.css';
import { calculators } from "@/data/calculators";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

export default function CrorepatiPlanningCalculator() {
    const router = useRouter();
    const [currentAge, setCurrentAge] = useState(10); // Current age of the child
    const [crorepatiStartAge, setCrorepatiStartAge] = useState(18); // Age at which Crorepati starts
    const [targetWealth, setTargetWealth] = useState(50000000); // Target wealth in INR
    const [currentSavings, setCurrentSavings] = useState(100000); // Current savings
    const [expectedReturn, setExpectedReturn] = useState(7); // Expected annual return in %
    const [inflationRate, setInflationRate] = useState(5); // Inflation rate in %

    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);



    useEffect(() => {
        const calculateCrorepatiPlan = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/crorepati-calculator?currentAge=${currentAge}&crorepatiAge=${crorepatiStartAge}&targetedWealth=${targetWealth}&currentSavings=${currentSavings}&expectedReturn=${expectedReturn}&inflationRate=${inflationRate}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
                if (res.status === 200) {
                    const data = res.data
                    // console.log(data)
                    const futureTargetWealth = data.futureTargetWealth;
                    const savingsGrowth = data.savingsGrowth;
                    const finalTargetWealth = data.finalTargetWealth;
                    const sipInvestmentRequired = data.sipInvestmentRequired;
                    const totalSIPInvestment = data.totalSIPInvestment;
                    const sipGrowth = data.sipGrowth;
                    const sipFutureValue = data.sipFutureValue;
                    const yearlyData = data.yearlyData;
                    setResult({
                        futureTargetWealth: Math.round(futureTargetWealth),
                        growthOfSavings: Math.round(savingsGrowth),
                        finalTargetWealth: Math.round(finalTargetWealth),
                        sipInvestmentRequired: Math.round(sipInvestmentRequired),
                        totalSIPInvestment: Math.round(totalSIPInvestment),
                        sipGrowth: Math.round(sipGrowth),
                        sipFutureValue: Math.round(sipFutureValue),
                    });
                    setChartData(yearlyData);
                }
            }
            catch (error) {
                console.log(error)
            }

        };
        calculateCrorepatiPlan();
    }, [currentAge, crorepatiStartAge, targetWealth, currentSavings, expectedReturn, inflationRate]);
    const handleCalculatorChange = (e) => {
        const selectedRoute = e.target.value;
        if (selectedRoute) {
            router.push(selectedRoute); // Navigate to selected route
        }
    };
   const getGradient = (value, min, max) => {
        const percentage =  ((value - min) / (max - min)) * 100;
        console.log(percentage);
        return `linear-gradient(to right,   rgba(var(--rv-primary-rgb)/ 0.20) 0%, var(--rv-secondary) ${percentage}%, #e5e7eb 0%)`;
    };
    return (
        <div className="">
            <div className="">
                <RvBreadcrumbs
                    maintitle="Tools"
                    maintitleLink='/tools/calculators'
                    lastTitle='Calculators'
                    lastTitleLink='/tools/calculators'
                    lastTitle2='Crorepati Planning Calculator'


                />
            </div>
            <div className="section">
            <div className="">
                <div className="container">
                    <div className={`${styles.rvsRow} rvRow pb-5`}>
                        <div className={`${styles.rvsCol} rvCol`}>
                            <h5 className="">
                                Crorepati Planning Calculator
                            </h5>
                        </div>
                        <div className={`${styles.rvsCol} rvCol`}>
                            <div className={`${styles.rvsRow} rvRow`}>
                            <div className={`${styles.rvsCol} rvCol`}>
                                <b>Explore other calculators</b>
                                </div>
                            <div className={`${styles.rvsCol} rvCol`}>
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
                        </div>
                    </div>
                    <div>
                        
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4">
                            <div className='col-span-1'>
                                <div className={`${styles.rvCard}`}>
                                    <div className="sip-calculator  ">
                                        <div className="input-fields mt-5 mb-10">
                                            {/* Target Wealth */}
                                            <div>
                                                <div className='flex justify-between mt-5'>
                                                    <b>Target Wealth (INR)?</b>
                                                    <div className={`${styles.rvcinputgroup}`}>
                                                        <span className='font-semibold text-green-700'>₹</span>
                                                        <input
                                                            type="number"
                                                            value={targetWealth}
                                                            onChange={(e) => setTargetWealth(parseFloat(e.target.value.replace(/,/g, '')))}
                                                            className={`${styles.rvcinput}`}
                                                        />
                                                    </div>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1000000"
                                                    max="1000000000"
                                                    step="1000000"
                                                    value={targetWealth}
                                                    onChange={(e) => setTargetWealth(parseFloat(e.target.value))}
                                                    style={{background: getGradient(targetWealth, 0, 1000000000)}}
                                                    className="mt-4 w-full h-2 rounded-lg appearance-none cursor-pointer border-0 border-white-100
                                                    [&::-webkit-slider-thumb]:appearance-none
                                                    [&::-webkit-slider-thumb]:w-5
                                                    [&::-webkit-slider-thumb]:h-5
                                                    [&::-webkit-slider-thumb]:rounded-full
                                                    [&::-webkit-slider-thumb]:bg-[var(--rv-primary)]
                                                    [&::-webkit-slider-thumb]:border-2
                                                    [&::-webkit-slider-thumb]:border-white-600
                                                    [&::-webkit-slider-thumb]:shadow
                                                    [&::-moz-range-thumb]:appearance-none
                                                    [&::-moz-range-thumb]:w-5
                                                    [&::-moz-range-thumb]:h-5
                                                    [&::-moz-range-thumb]:rounded-full
                                                    [&::-moz-range-thumb]:bg-[var(--rv-primary)]
                                                    [&::-moz-range-thumb]:border-white-600
                                                    [&::-moz-range-thumb]:border-2"
                                                />
                                            </div>
                                            {/* Current Age */}
                                            <div className='items-center mt-5 mb-5'>
                                                <div className='flex justify-between'>
                                                    <b>Current Age</b>
                                                    <span className={`${styles.rvcinputgroup}`}>
                                                    <input
                                                        type="number"
                                                        value={currentAge}
                                                        onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                        className={`${styles.rvcinput}`}
                                                    />
                                                    </span>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1"
                                                    max="80"
                                                    // step="1"
                                                    value={currentAge}
                                                    onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                                                    className={`${styles.customslider}`}
                                                    // style={{background: getGradient(currentAge,-1, 82),}}
                                                    // className="mt-4 w-full h-2 rounded-lg appearance-none cursor-pointer border-0 border-white-100
                                                    // [&::-webkit-slider-thumb]:appearance-none
                                                    // [&::-webkit-slider-thumb]:w-5
                                                    // [&::-webkit-slider-thumb]:h-5
                                                    // [&::-webkit-slider-thumb]:rounded-full
                                                    // [&::-webkit-slider-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-webkit-slider-thumb]:border-2
                                                    // [&::-webkit-slider-thumb]:border-white-600
                                                    // [&::-webkit-slider-thumb]:shadow
                                                    // [&::-moz-range-thumb]:appearance-none
                                                    // [&::-moz-range-thumb]:w-5
                                                    // [&::-moz-range-thumb]:h-5
                                                    // [&::-moz-range-thumb]:rounded-full
                                                    // [&::-moz-range-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-moz-range-thumb]:border-white-600
                                                    // [&::-moz-range-thumb]:border-2"
                                                />
                                                
                                            </div>
                                            {/* Crorepati Start Age */}
                                            <div className='items-center mt-5 mb-5'>
                                                <div className='flex justify-between'>
                                                    <b>Age at the Time of Crorepati</b>
                                                    <span className={`${styles.rvcinputgroup}`}>
                                                    <input
                                                        type="number"
                                                        value={crorepatiStartAge}
                                                        onChange={(e) => setCrorepatiStartAge(parseFloat(e.target.value))}
                                                       className={`${styles.rvcinput}`}
                                                    />
                                                    </span>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="10"
                                                    max="100"
                                                    step="1"
                                                    value={crorepatiStartAge}
                                                    onChange={(e) => setCrorepatiStartAge(parseFloat(e.target.value))}
                                                    // style={{background: getGradient(crorepatiStartAge,10, 101),}}
                                                    // className="mt-4 w-full h-2 rounded-lg appearance-none cursor-pointer border-0 border-white-100
                                                    // [&::-webkit-slider-thumb]:appearance-none
                                                    // [&::-webkit-slider-thumb]:w-5
                                                    // [&::-webkit-slider-thumb]:h-5
                                                    // [&::-webkit-slider-thumb]:rounded-full
                                                    // [&::-webkit-slider-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-webkit-slider-thumb]:border-2
                                                    // [&::-webkit-slider-thumb]:border-white-600
                                                    // [&::-webkit-slider-thumb]:shadow
                                                    // [&::-moz-range-thumb]:appearance-none
                                                    // [&::-moz-range-thumb]:w-5
                                                    // [&::-moz-range-thumb]:h-5
                                                    // [&::-moz-range-thumb]:rounded-full
                                                    // [&::-moz-range-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-moz-range-thumb]:border-white-600
                                                    // [&::-moz-range-thumb]:border-2"
                                                />
                                            </div>
                                            {/* Rate of Return */}
                                            <div className='items-center mt-5'>
                                                <div className='flex justify-between'>
                                                    <b>Rate of Return (%)</b>
                                                    <span className={`${styles.rvcinputgroup}`}>
                                                    <input
                                                        type="number"
                                                        value={expectedReturn}
                                                        onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                       className={`${styles.rvcinput}`}
                                                    />
                                                    </span>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1"
                                                    max="30"
                                                    step="1"
                                                    value={expectedReturn}
                                                    onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                                                    // style={{background: getGradient(expectedReturn,0, 31),}}
                                                    // className="mt-4 w-full h-2 rounded-lg appearance-none cursor-pointer border-0 border-white-100
                                                    // [&::-webkit-slider-thumb]:appearance-none
                                                    // [&::-webkit-slider-thumb]:w-5
                                                    // [&::-webkit-slider-thumb]:h-5
                                                    // [&::-webkit-slider-thumb]:rounded-full
                                                    // [&::-webkit-slider-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-webkit-slider-thumb]:border-2
                                                    // [&::-webkit-slider-thumb]:border-white-600
                                                    // [&::-webkit-slider-thumb]:shadow
                                                    // [&::-moz-range-thumb]:appearance-none
                                                    // [&::-moz-range-thumb]:w-5
                                                    // [&::-moz-range-thumb]:h-5
                                                    // [&::-moz-range-thumb]:rounded-full
                                                    // [&::-moz-range-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-moz-range-thumb]:border-white-600
                                                    // [&::-moz-range-thumb]:border-2"
                                                />
                                            </div>
                                            {/* Inflation Rate */}
                                            <div className='items-center mt-5'>
                                                <div className='flex justify-between'>
                                                    <b>Inflation Rate (%)</b>
                                                    <span className={`${styles.rvcinputgroup}`}>

                                                    <input
                                                        type="number"
                                                        value={inflationRate}
                                                        onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                                       className={`${styles.rvcinput}`}
                                                    />
                                                </span>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1"
                                                    max="20"
                                                    step="1"
                                                    value={inflationRate}
                                                    onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                                                    // style={{background: getGradient(inflationRate,0, 21),}}
                                                    // className="mt-4 w-full h-2 rounded-lg appearance-none cursor-pointer border-0 border-white-100
                                                    // [&::-webkit-slider-thumb]:appearance-none
                                                    // [&::-webkit-slider-thumb]:w-5
                                                    // [&::-webkit-slider-thumb]:h-5
                                                    // [&::-webkit-slider-thumb]:rounded-full
                                                    // [&::-webkit-slider-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-webkit-slider-thumb]:border-2
                                                    // [&::-webkit-slider-thumb]:border-white-600
                                                    // [&::-webkit-slider-thumb]:shadow
                                                    // [&::-moz-range-thumb]:appearance-none
                                                    // [&::-moz-range-thumb]:w-5
                                                    // [&::-moz-range-thumb]:h-5
                                                    // [&::-moz-range-thumb]:rounded-full
                                                    // [&::-moz-range-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-moz-range-thumb]:border-white-600
                                                    // [&::-moz-range-thumb]:border-2"
                                                />
                                            </div>
                                            <div className='items-center mt-5'>
                                                {/* Current Savings */}
                                                <div className='flex justify-between'>
                                                    <b>Current Savings (INR)?</b>
                                                    <div>
                                                    <span className={`${styles.rvcinputgroup}`}>

                                                        <span className='font-semibold text-green-700'>₹</span>
                                                        <input
                                                            type="number"
                                                            value={currentSavings}
                                                            onChange={(e) => setCurrentSavings(parseFloat(e.target.value.replace(/,/g, '')))}
                                                           className={`${styles.rvcinput}`}
                                                        />
                                                    </span>
                                                    </div>
                                                </div>
                                                <Input
                                                    type="range"
                                                    min="1000000"
                                                    max="1000000000"
                                                    step="100000"
                                                    value={currentSavings}
                                                    onChange={(e) =>  setCurrentSavings(parseFloat(e.target.value))}
                                                    // style={{background: getGradient(currentSavings,1000000, 1000000001),}}
                                                    // className="mt-4 w-full h-2 rounded-lg appearance-none cursor-pointer border-0 border-white-100
                                                    // [&::-webkit-slider-thumb]:appearance-none
                                                    // [&::-webkit-slider-thumb]:w-5
                                                    // [&::-webkit-slider-thumb]:h-5
                                                    // [&::-webkit-slider-thumb]:rounded-full
                                                    // [&::-webkit-slider-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-webkit-slider-thumb]:border-2
                                                    // [&::-webkit-slider-thumb]:border-white-600
                                                    // [&::-webkit-slider-thumb]:shadow
                                                    // [&::-moz-range-thumb]:appearance-none
                                                    // [&::-moz-range-thumb]:w-5
                                                    // [&::-moz-range-thumb]:h-5
                                                    // [&::-moz-range-thumb]:rounded-full
                                                    // [&::-moz-range-thumb]:bg-[var(--rv-primary)]
                                                    // [&::-moz-range-thumb]:border-white-600
                                                    // [&::-moz-range-thumb]:border-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.rvCard}`}>
                                    {result && (
                                        <ul className={`${styles.rvdatafinaltext}`}>
                                            <li className=''>
                                                <span>Your Targeted Wealth (Inflation Adjusted)</span>
                                                <b className=''>₹ {result.futureTargetWealth.toLocaleString()}</b>
                                            </li>
                                            <li className=''>
                                                <span>Growth of Savings</span>
                                                <b className=''>₹ {result.growthOfSavings.toLocaleString()}</b>
                                            </li>
                                            <li className=''>
                                                <span>Monthly SIP Amount Required</span>
                                                <b className=''>₹ {result.sipInvestmentRequired.toLocaleString()}</b>
                                            </li>
                                            <li className=''>
                                                <span>Amount Invested through SIP in {crorepatiStartAge - currentAge} years</span>
                                                <b className=''>₹ {result.totalSIPInvestment.toLocaleString()}</b>
                                            </li>
                                            <li className=''>
                                                <span>SIP Growth</span>
                                                <b className=''>₹ {result.sipGrowth.toLocaleString()}</b>
                                            </li>
                                            <li className=''>
                                                <span>Future Value of SIP</span>
                                                <b className=''>₹ {result.sipFutureValue.toLocaleString()}</b>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <SippieChart
                                    piedata={{
                                        totalInvestment: result?.sipFutureValue,
                                        futureValue: result?.totalSIPInvestment
                                    }}
                                    title={'Education Planning Projection'}
                                    customLabels={{
                                        invested: "Current Expenses",
                                        return: "Future Expenses",
                                    }}
                                    className="mb-4"
                                />
                                <CalculatorReturnChart data={chartData} />
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
        </div>
    );
}
