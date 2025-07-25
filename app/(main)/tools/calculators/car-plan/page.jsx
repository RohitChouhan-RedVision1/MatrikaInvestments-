"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import router
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
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

export default function Page() {
  const router = useRouter();

  const [totalInvestment, setCurrentExpenses] = useState(10000);
  const [investmentDuration, setInvestmentDuration] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(5);
  const [inflationRate, setInflationRate] = useState(5);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const calculateCarPlan = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_DATA_API}/api/calculators/car-plan?currentCarCost=${totalInvestment}&planCarInYears=${investmentDuration}&expectedReturn=${expectedReturn}&inflationRate=${inflationRate}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        if (res.status === 200) {
          const data = res.data;
          setResult({
            totalInvestment: data.currentCarCost,
            futureValue: Math.round(data.futureCarCost),
            lumpsumInvestment: Math.round(data.lumpsumInvestment),
            sipInvestment: Math.round(data.sipInvestment),
          });
          setChartData(data.yearlyData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    calculateCarPlan();
  }, [totalInvestment, investmentDuration, expectedReturn, inflationRate]);

  const handleCalculatorChange = (e) => {
    const selectedRoute = e.target.value;
    if (selectedRoute) {
      router.push(selectedRoute); // Navigate to selected route
    }
  };

  return (
    <div className="">
          <div className="">
        <RvBreadcrumbs
          maintitle="Tools"
          maintitleLink='/tools/calculators'
          lastTitle='Calculators'
          lastTitleLink='/tools/calculators'
          lastTitle2='Car Planning Calculator'
        

        />
      </div>
      <div className="section">
    <div className="max-w-screen-xl mx-auto main_section ">
      <div className=" ">

        <div className="mb-5 flex flex-col md:flex-row gap-5 justify-between ">
          <div className="">
            <span className="text-2xl md:text-3xl font-bold uppercase">
              Car Planning Calculator
            </span>
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
              <div className="col-span-1 border border-gray-200 rounded-2xl bg-white p-5">
                <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
                  <div className="input-fields mt-5 mb-10">
                    <div>
                      <div className="flex justify-between">
                        <b>Current Cost</b>
                        <div>
                          <span className="font-semibold text-green-700">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={totalInvestment}
                            onChange={(e) =>
                              setCurrentExpenses(parseFloat(e.target.value))
                            }
                            className="font-semibold text-green-700 w-24 border-none"
                          />
                        </div>
                      </div>
                      <Input
                        type="range"
                        min="1000000"
                        max="100000000"
                        step="1000"
                        value={totalInvestment}
                        onChange={(e) =>
                          setCurrentExpenses(parseFloat(e.target.value))
                        }
                        className="customRange w-full"
                        style={{
                          "--progress":
                            ((totalInvestment - 1000000) /
                              (100000000 - 1000000)) *
                              100 +
                            "%",
                        }}
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between">
                        <b>
                          After How Many Years Do You Wish To Plan Your Dream
                          Car
                        </b>
                        <input
                          type="number"
                          value={investmentDuration}
                          onChange={(e) =>
                            setInvestmentDuration(parseFloat(e.target.value))
                          }
                          className="font-semibold text-green-700 w-10 border-none"
                        />
                      </div>
                      <Input
                        type="range"
                        min="1"
                        max="40"
                        step="1"
                        value={investmentDuration}
                        onChange={(e) =>
                          setInvestmentDuration(parseFloat(e.target.value))
                        }
                        className="customRange w-full"
                        style={{
                          "--progress": `${
                            ((investmentDuration - 1) / (40 - 1)) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between">
                        <b>Rate of Return (%)</b>
                        <input
                          type="number"
                          value={expectedReturn}
                          onChange={(e) =>
                            setExpectedReturn(parseFloat(e.target.value))
                          }
                          className="font-semibold text-green-700 w-10 border-none"
                        />
                      </div>
                      <Input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={expectedReturn}
                        onChange={(e) =>
                          setExpectedReturn(parseFloat(e.target.value))
                        }
                        className="customRange w-full"
                        style={{
                          "--progress": `${
                            ((expectedReturn - 1) / (30 - 1)) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <div className="items-center mt-5">
                      <div className="flex justify-between">
                        <b>Inflation Rate (%)</b>
                        <input
                          type="number"
                          value={inflationRate}
                          onChange={(e) =>
                            setInflationRate(parseFloat(e.target.value))
                          }
                          className="font-semibold text-green-700 w-10 border-none"
                        />
                      </div>
                      <Input
                        type="range"
                        min="1"
                        max="30"
                        step="1"
                        value={inflationRate}
                        onChange={(e) =>
                          setInflationRate(parseFloat(e.target.value))
                        }
                        className="customRange w-full"
                        style={{
                          "--progress": `${
                            ((inflationRate - 1) / (30 - 1)) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {result && (
                    <div className="mt-5">
                      <div className="flex justify-between px-5 mb-3">
                        <p>Current Cost of Car</p>
                        <p className="font-bold text-lg">
                          ₹{result?.totalInvestment?.toLocaleString()}
                        </p>
                      </div>
                      <hr className="mb-3" />
                      <div className="flex justify-between px-5 mb-3">
                        <p>Future Cost of Car</p>
                        <p className="font-bold text-lg">
                          ₹{result?.futureValue?.toLocaleString()}
                        </p>
                      </div>
                      <hr className="mb-3" />
                      <div className="flex justify-between px-5 mb-3">
                        <p>Planning Through SIP</p>
                        <p className="font-bold text-lg">
                          ₹{result?.sipInvestment?.toLocaleString()}
                        </p>
                      </div>
                      <hr className="mb-3" />
                      <div className="flex justify-between px-5 mb-3">
                        <p>Planning Through Lump Sum</p>
                        <p className="font-bold text-lg">
                          ₹{result?.lumpsumInvestment?.toLocaleString()}
                        </p>
                      </div>
                      <hr />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-1">
                <SippieChart
                  piedata={result}
                  title={"Current & Future Cost Of Car Breakup"}
                  customLabels={{
                    invested: "Current Cost of Car",
                    return: "Future Cost of Car",
                  }}
                />
                <div className="mt-5">
                  <CalculatorReturnChart
                    data={chartData}
                    title={"Car Planning "}
                  />
                </div>
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
