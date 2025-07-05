"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Gallery = () => {
    const [data, setData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/investor-photos");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch Photos", error);
            }
        };
        fetchData();
    }, []);

    const openImage = (index) => {
        setSelectedIndex(index);
    };

    const closeImage = () => {
        setSelectedIndex(null);
    };

    const prevImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + data.length) % data.length);
        }
    };

    const nextImage = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % data.length);
        }
    };

    return (
        <section>
            <div className="page-header bg-gray-800 text-white py-10">
                <div className="container mx-auto px-4">
                    <div className="page-header-box">
                        <h1 className="text-3xl font-bold mb-2">Investor Meet Photos</h1>
                        <Breadcrumb>
                            <BreadcrumbList className="text-white">
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Gallery</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                        <div key={index} className="group cursor-pointer shadow-lg p-4" onClick={() => openImage(index)}>
                            
                            <div className="overflow-hidden rounded ">
                                <img
                                    src={item?.image?.url}
                                    alt={item?.title}
                                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <p className="text-3xl font-semibold mb-1">{item?.title}</p>
                            <p className="text-lg text-gray-500 mb-2">{new Date(item?.eventDate).toLocaleDateString()}</p>
                            <p className=" mt-2 text-gray-700">{item?.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
                    <button onClick={closeImage} className="absolute top-5 right-5 text-white text-3xl">
                        <X />
                    </button>
                    <button onClick={prevImage} className="absolute left-5 text-white bg-black rounded-full p-2 text-3xl">
                        <ChevronLeft />
                    </button>
                    <button onClick={nextImage} className="absolute right-5 text-white bg-black rounded-full p-2 text-3xl">
                        <ChevronRight />
                    </button>

                    <div className="text-center text-white max-w-3xl">
                        <h2 className="text-2xl font-semibold mb-2">{data[selectedIndex].title}</h2>
                        <p className="text-sm mb-4">{new Date(data[selectedIndex].eventDate).toLocaleDateString()}</p>
                        <Zoom>
                            <img
                                src={data[selectedIndex].image?.url}
                                alt={data[selectedIndex].title}
                                className="max-h-[80vh] mx-auto object-contain rounded"
                            />
                        </Zoom>
                        {/* <p className="text-sm text-gray-300 mt-4">{data[selectedIndex].description}</p> */}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
