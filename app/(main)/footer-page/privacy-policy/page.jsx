"use client";
import { footerData } from "@/data/footer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

export default function PrivacyPolicy() {
    const [data, setData] = useState('');
    const [mainData, setMainData] = useState("");
    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings");
        if (data.ok) {
            const maindata = await data.json();
            setMainData(maindata[0])
        }
    };
    const fetchPolicy = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/privacy-policy?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (response.status === 200 && response.data && response.data[0]) {
                const data = response.data[0];
                setData(data.pvp);
            } else {
                console.error("Invalid data format:", response.data);
                alert("Failed to fetch services. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            alert("An error occurred while fetching services. Please try again.");
        }
    };
    useEffect(() => { fetchPolicy(); }, []);
    useEffect(() => { fetchdata(); }, []);

    function createMarkup() {
        const highlightedText = data
            .replace(/Your Company name/gi, `<mark style="background-color: transparent; font-size: 16px">${mainData?.websiteName}</mark>`)
            .replace(/What we collect/gi, '<br><br><mark style="background-color: transparent; font-size: 18px">What we collect</mark> <br/>')
            .replace(/Name and contact details/gi, '<br><br><mark style="background-color: transparent; font-size: 18px">Name and contact details</mark><br>')
            .replace(/Collection Use of image data/gi, '<br><br><mark style="background-color: transparent; font-size: 18px">Collection Use of image data</mark>')
            .replace(/Use of location data/gi, '<br><br><mark style="background-color: transparent; font-size: 18px">Use of location data</mark><br>')
            .replace(/Security/, '<br><br><mark style="background-color: transparent; font-size: 18px">Security</mark><br>')
            .replace(/Links to other websites/, '<br><br><mark style="background-color: transparent; font-size: 18px">Links to other websites</mark><br>')
            .replace(/Controlling your personal information/gi, '<br><br><mark style="background-color: transparent; font-size: 18px">Controlling your personal information</mark><br>')
            .replace(/Security certificates/gi, '<br><br><mark style="background-color: transparent; font-size: 18px">Security certificates</mark><br>')
        return { __html: highlightedText };
    }

    return (
        <div className="">
             <div className="">
                <RvBreadcrumbs
                    maintitle="Privacy Policy"
                    // lastTitle='Privacy Policy'

                />
            </div>
        <div className="section">
            <div className="container">
            <p dangerouslySetInnerHTML={createMarkup()} />
            </div>
        </div>
        </div>
    );
}
