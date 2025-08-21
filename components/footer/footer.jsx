"use client";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { footerData } from "@/data/footer";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import styles from './Footer.module.css'
import { servicesdata } from "@/data/commanData";

const Footer = ({ services, siteData, socialMedia, arnData }) => {
const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-primary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-primary)]" />,
    Linkedin: <FaLinkedin className="text-[var(--rv-primary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-primary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-primary)]" />,
  };
    const quicklinks = [
        {
            title: "About Us",
            link: "/about-us"
        },
        {
            title: "Contact Us",
            link: "/contact-us"
        },
        {
            title: "Blogs",
            link: "/blogs"
        },
        {
            title: "Financial Calculator",
            link: "/tools/calculators"
        },
        {
            title: "Financial Health",
            link: "/tools/financial-health"
        },
        {
            title: "Privacy Policy",
            link: "/footer-page/privacy-policy"
        },
        {
            title: "Commission Disclosures",
            link: "/footer-page/commission-disclosures"
        },
    ]
    const amfisabilinks = [
        {
            title: "Risk Factors ",
            link: "/footer-page/risk-factors"
        },
        {
            title: "Terms & Conditions ",
            link: "/footer-page/terms-conditions"
        },
        {
            title: "SID/SAI/KIM ",
            link: "https://www.sebi.gov.in/filings/mutual-funds.html",
            target: "_black"
        },
        {
            title: "Code of Conduct ",
            link: "/images/AMFI_Code-of-Conduct.pdf",
            target: "_black"

        },
        {
            title: "Investor Grievance Redressal ",
            link: "/footer-page/investor-grievance-redressal"
        },
        {
            title: "Important links",
            link: "/footer-page/important-links"
        },
        {
            title: "SEBI Circulars ",
            link: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Mutual+Funds",
            target: "_black"
        },
    ]
    const [usefulLink, setUsefulLink] = useState([]);

    const fetchLinks = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (res.ok) {
            const data = await res.json();
            setUsefulLink(data)
        }
    };

    useEffect(() => { fetchLinks(); }, []);

    return (
        <footer className={styles.mainFooter}>
            <div className="container">
                <div className={styles.rvmfRow}>
                    <div className={styles.rvmfCol}>
                        <div className={styles.footerNewsletterBox}>
                            <Image
                                src={"/logo.webp"}
                                alt="logo"
                                width={200}
                                height={150}
                                className=""
                            />
                            <p className="">We are AMFI Certified Mutual Fund Distributor and APMI certified PMS Distributor firm which offers financial solutions to our clients and create sustainable Wealth. We follow strategies to meet your financial goals. We deal with various services and products to suit your requirements. Addplans works on core values like trust & determination which keeps us pushing ourselves to give you our best.</p>
                            {/* <div className={styles.footerNewsletterTitle}>
                                <h3>Don&apos;t missed subscribed!</h3>
                            </div>
                            <div className={styles.newsletterForm}>
                                <form id="newsletterForm" action="#" method="POST">
                                    <div className={styles.formGroup}>
                                        <input type="email" name="email" className={styles.formControl} id="mail" placeholder="Enter Your Email" required="" />
                                        <button type="submit" className={styles.newsletterBtn}>
                                            <Image src="/images/arrow-white.svg" alt="Subscribe" width={40} height={20} />
                                        </button>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>

                    <div className={styles.rvmfCol}>
                        <div className={styles.footerLinks}>
                            <h3>Services</h3>
                            <ul>
                            {servicesdata?.map((servicesditems, index) => (

                                <li key={index + 1}>
                                <Link href={`/services/${servicesditems?.slugUrl}`} className="" >
                                    {servicesditems?.title}
                                </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.rvmfCol}>
                        <div className={styles.footerLinks}>
                            <h3>Quick Links</h3>
                            <ul>
                                {quicklinks?.map((sub, index) => (
                                    <li key={index}>
                                        <Link href={sub?.link}>{sub?.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.rvmfCol}>
                        <div className={styles.footerLinks}>
                            <h3>Usefull Link</h3>
                            <ul>
                                {usefulLink?.map((sub, index) => (
                                    <li key={index}><Link href={sub?.link} target="_blank">{sub?.title}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>


                </div>

                <div className="col-span-7">
                    <div className={styles.footerCtaBox}>
                        <div className={styles.footerLogo}>
                            <Image src={"/images/amfi-logo.jpg"} width={80} height={80} alt="amfi" className="rounded" />
                        </div>
                        <div className={styles.footerContactBox}>
                            <div className={styles.footerContactItem}>
                                <p>Need Help?</p>
                                {/* <h3>{siteData?.mobile} / {siteData?.alternateMobile}</h3> */}
                                <h3>{siteData?.mobile} </h3>
                            </div>
                            <div className={styles.footerContactItem}>
                                <p>Email Now</p>
                                <h3>{siteData?.email}</h3>
                            </div>
                            <div className={styles.footerContactItem}>
                                <p>ARN</p>
                                <h3>{arnData[0]?.arn}</h3>
                            </div>
                            <div className={styles.footerContactItem}>
                                <p>EUIN</p>
                                <h3>{arnData[0]?.euins[0]?.euin}</h3>
                            </div>
                        </div>
                        <div className={styles.footersabiLink}>
                            <ul>
                            {amfisabilinks?.map((sub, index) => (
                                    <li key={index}>
                                        <Link href={sub?.link} target={`${sub?.target ? sub?.target : "_self"}`}  >{sub?.title}</Link>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                        <div className={styles.footerCtasabidic}>
                            <p className="">{siteData?.websiteName} is an AMFI Registered Mutual Fund Distributor.</p>
                            <p className="">
                                Disclaimer: Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. The Mutual Fund is not guaranteeing or assuring any dividend under any of the schemes and the same is subject to the availability and adequacy distributable surplus.
                            </p>
                            <p className="">
                                {siteData?.websiteName} makes no warranties or representations, express or implied, on products offered through the platform of {siteData?.websiteName}. It accepts no liability for any damages or losses, however, caused, in connection with the use of, or on the reliance of its product or related services. Terms and conditions of the website are applicable. Investments in Securities markets are subject to market risks, read all the related documents carefully before investing.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.footerCopyright}>


                    <div className={styles.footerCopyrightText}>
                        <div className="">
                        <p>{new Date().getFullYear()} © <b>{siteData?.websiteName}</b>. All rights reserved.</p>
                        <p><Link target="_blank" href="https://www.redvisiontechnologies.com/" className=""> Designed & Developed by REDVision Global Technologies </Link></p>

                        </div>
                          <div className={styles.socialMediaicone}>
                        <ul>
                         {socialMedia
                            .filter((link) => !link.isHidden).map((link, index) => (
                                <li key={index} className={`${styles.followIcon}`} >
                            <Link  target="_blank" href={link?.url}>
                                {iconMap[link?.title] || (
                                    <FaXTwitter  />
                                )}
                            </Link> 
                                </li>
                            ))}

                         </ul>
                    </div>
                    </div>

                  
                </div>

                <div className={`btn btn-primary bookAppointment ${styles.bookAppointment}`}>
                     <Image
                                src={"/images/bookapoiment.svg"}
                                alt="logo"
                                width={30}
                                height={30}
                                className="mr-4"
                            />
                    <Link  className="" href='/book-appointment'>Book an Appointment</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;