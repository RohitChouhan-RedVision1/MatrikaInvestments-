"use client";
import { useEffect, useState } from 'react';
import styles from './AboutSection.module.css';
import Image from 'next/image';
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default function AboutSectionPage() {
    const [mainData, setMainData] = useState("");
    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings");
        if (data.ok) {
            const maindata = await data.json();
            setMainData(maindata[0])
        }
    };
    useEffect(() => { fetchdata() }, [])
    return (
        <div className={`${styles.aboutUsPage} section`}>
            <div className="container">
                <div className={styles.aboutUsRow}>
                    <div className={styles.aboutContentBody}>
                        <SectionHeading
                            maintitle='about us '
                            title='Trusted Guidance for'
                            secondPart='Financial Growth'
                            paragraph={
                                <>
                                    <p>
                                        At Matrika Investments, we bring decades of industry experience and a steadfast
                                        commitment to your financial success. As a trusted wealth management firm, we
                                        specialize in crafting personalized strategies that align with your goals,
                                        values, and future aspirations.
                                    </p>

                                    <h3 className="text-lg font-semibold mt-4">A Legacy of Experience</h3>
                                    <p>
                                        With over 15 years in the financial services industry, our team has successfully
                                        navigated clients through all market cycles. Our proven track record is built on
                                        integrity, diligence, and results—delivering tailored solutions across investment
                                        management, retirement planning, estate strategies, tax-efficient portfolios,
                                        and more.
                                    </p>

                                    <h3 className="text-lg font-semibold mt-4">Certified Expertise You Can Trust</h3>
                                    <p>Our advisors are more than just experienced—they are highly credentialed professionals dedicated to fiduciary excellence. Our team includes:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>NISM VA</li>
                                        <li>NISM XA (Investment Advisor Level 1)</li>
                                        <li>NISM XB (Investment Advisor Level 2)</li>
                                    </ul>

                                    <h3 className="text-lg font-semibold mt-4">Our Promise</h3>
                                    <p>
                                        We believe that wealth management is not just about numbers—it&apos;s about people.
                                        That’s why we take the time to understand what matters most to you, helping you
                                        make informed, confident decisions at every stage of life.
                                    </p>

                                    <p className="mt-4 font-medium">
                                        Let us help you build, preserve, and grow your wealth—today and for generations
                                        to come.
                                    </p>
                                </>
                            }
                        />

                        <div className={styles.rvacbCard}>
                            <div className={styles.rvcncBody}>
                                <div className={styles.rvcnccicone}>
                                    <Image
                                        src="/images/icon-financial-strategies.svg"
                                        alt="Financial Strategies Icon"
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div className={styles.rvcncccontent}>
                                    <h5 className={styles.rvcncccTitle}>Financial Strategies</h5>
                                    <p className={styles.rvcncccCP}>Tailored plans to meet your unique financial needs and goals.</p>
                                </div>
                                <div className={styles.rvcncccContect}>
                                    <div className={styles.rvcnccicone}>
                                        <Image
                                            src="/images/icon-phone-white.svg"
                                            alt="Phone Icon"
                                            width={35}
                                            height={30}
                                        />
                                    </div>
                                    <p><a href={`tel:${mainData?.mobile}`}>{mainData?.mobile}</a></p>
                                </div>
                            </div>
                            {/* <div className="about-author-box wow fadeInUp" data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                    <div className="about-info-box">
                                        <figure className="image-anime">
                                            <Image
                                                src="/images/author-1.jpg"
                                                alt="Author Image"
                                                width={100}
                                                height={100}
                                                layout="intrinsic"
                                            />
                                        </figure>

                                        <div className="about-author-content">
                                            <h3>Sarah T.</h3>
                                            <p>Co. founder</p>
                                        </div>
                                    </div>
                                    <div className="about-info-list">
                                        <ul>
                                            <li>risk management</li>
                                            <li>communication</li>
                                            <li>24/7 support</li>
                                        </ul>
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
