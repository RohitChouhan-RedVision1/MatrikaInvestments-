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

export default function Page() {
    const router = useRouter();
    const [loanAmount, setLoanAmount] = useState(100000); // Loan Amount
    const [currentFdRate, setCurrentFdRate] = useState(5); // Current FD Rate
    const [inflationRate, setInflationRate] = useState(5); // Inflation Rate
    const [protectionDuration, setProtectionDuration] = useState(5); // Duration in years
    const [monthlyExpenses, setMonthlyExpenses] = useState(10000); // Monthly Expenses
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);

   

    // Update the calculation when any of the values change
    useEffect(() => {
        const calculateInsurancePlan = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/life-insurance-calculator?loanAmount=${loanAmount}&currentFdRate=${currentFdRate}&protectionDuration=${protectionDuration}&inflationRate=${inflationRate}&monthlyExpenses=${monthlyExpenses}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
                if (res.status === 200) {
                    const data = res.data
                    const loanAmount = data.loanAmount;
                    const totalHouseholdExpenses = data.totalHouseholdExpenses;
                    const totalInsuranceCover = data.totalInsuranceCover;
                    const yearlyData = data.yearlyData;
                    setResult({
                        loanRepayment: loanAmount,
                        householdExpenses: Math.round(totalHouseholdExpenses),
                        totalInsuranceCover: Math.round(totalInsuranceCover),
                    });
                    setChartData(yearlyData);
                }
            }
            catch (error) {
                console.log(error)
            }
    
        };
        calculateInsurancePlan();
    }, [loanAmount, currentFdRate, inflationRate, protectionDuration, monthlyExpenses]);
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
                lastTitle2='Life Insurance Planning Calculator'
            />
        <div  className="max-w-screen-xl mx-auto main_section section">
        <div className="">
            <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between">
            <div className="">
                        <b className="text-2xl md:text-3xl font-bold uppercase">
                            Life Insurance Planning Calculator
                        </b>
                    </div>
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
                            <div className="insurance-calculator container mx-auto p-3 sticky top-0 z-10">
                                <div className="input-fields mt-5 mb-10">
                                    <div>
                                        <div className='flex justify-between'>
                                            <b>Loan Amount</b>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="number"
                                                    value={loanAmount}
                                                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                       <Input
  type="range"
  min="10000"
  max="10000000"
  step="1000"
  value={loanAmount}
  onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((loanAmount - 10000) / (10000000 - 10000)) * 100}%`,
  }}
/>

                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <b>Current FD Rate (%)</b>
                                            <input
                                                type="number"
                                                value={currentFdRate}
                                                onChange={(e) => setCurrentFdRate(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                       <Input
  type="range"
  min="1"
  max="15"
  step="0.1"
  value={currentFdRate}
  onChange={(e) => setCurrentFdRate(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((currentFdRate - 1) / (15 - 1)) * 100}%`,
  }}
/>

                                    </div>
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
    '--progress': `${((inflationRate - 1) / (30 - 1)) * 100}%`,
  }}
/>

                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <b>For How Many Years You Want To Protect Your Household Expenses</b>
                                            <input
                                                type="number"
                                                value={protectionDuration}
                                                onChange={(e) => setProtectionDuration(parseFloat(e.target.value))}
                                                className="font-semibold text-green-700 w-10 border-none"
                                            />
                                        </div>
                                       <Input
  type="range"
  min="1"
  max="40"
  step="1"
  value={protectionDuration}
  onChange={(e) => setProtectionDuration(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${((protectionDuration - 1) / (40 - 1)) * 100}%`,
  }}
/>

                                    </div>
                                    <div className='items-center mt-5'>
                                        <div className='flex justify-between'>
                                            <b>Monthly Expenses</b>
                                            <div>
                                                <span className='font-semibold text-green-700'>₹</span>
                                                <input
                                                    type="number"
                                                    value={monthlyExpenses}
                                                    onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))}
                                                    className='font-semibold text-green-700 w-24 border-none'
                                                />
                                            </div>
                                        </div>
                                        <Input
  type="range"
  min="0"
  max="500000"
  step="1000"
  value={monthlyExpenses}
  onChange={(e) => setMonthlyExpenses(parseFloat(e.target.value))}
  className="customRange w-full"
  style={{
    '--progress': `${(monthlyExpenses / 500000) * 100}%`,
  }}
/>

                                    </div>
                                </div>

                                {result && (
                                    <div className="mt-5">
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>You need Life Insurance Cover Of</p>
                                            <p className='font-bold text-lg'>₹{result?.totalInsuranceCover?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Loan Repayment</p>
                                            <p className='font-bold text-lg'>₹{result?.loanRepayment?.toLocaleString()}</p>
                                        </div>
                                        <hr className='mb-3' />
                                        <div className='flex justify-between px-5 mb-3'>
                                            <p>Household Expenses</p>
                                            <p className='font-bold text-lg'>₹{result?.householdExpenses?.toLocaleString()}</p>
                                        </div>
                                        <hr />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='col-span-1 border border-gray-200 rounded-2xl bg-white p-5'>
                            <div className="mb-10">
                                <SippieChart
                                    piedata={{
                                        totalInvestment: result?.totalInsuranceCover,
                                        futureValue: result?.loanRepayment
                                    }}
                                    title={'Life Insurance'}
                                    customLabels={{
                                        invested: "Household Expenses",
                                        return: "Loan Repayment",
                                    }}
                                />
                            </div>
                            <div>
                                <CalculatorReturnChart data={chartData} title={"Life Insurance"} />
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
