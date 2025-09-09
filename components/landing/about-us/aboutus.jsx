"use client";
import { useEffect, useState } from 'react';
import styles from './AboutSection.module.css';
import Image from 'next/image';
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default function AboutSection() {
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
        <div className={`${styles.aboutUs} section`}>
            <div className="container">
                <div className={styles.aboutUsRow}>
                    <div className={styles.aboutUsImages}>
                        <div className={styles.aboutImg2} >
                            <div className={styles.imageAnime}>
                                <Image
                                    src="/images/about-us.webp"
                                    alt="About Image 2"
                                    width={1000}
                                    height={500} // Adjust as needed for aspect ratio

                                    className='object-cover'
                                />
                            </div>
                        </div>
                        <div className={styles.contactCircle}>
                            <Image
                                src="/images/contact-us-img.svg"
                                alt="Contact Us"
                                width={100}
                                height={100}
                            />
                        </div>
                    </div>
                    <div className={styles.aboutContentBody}>
                        <SectionHeading
                            maintitle='about us '
                            title='Trusted Guidance for'
                            secondPart='Financial Growth'
                            paragraph='With years of expertise in finance and consulting, we provide tailored strategies to help you achieve sustainable growth. Our commitment is to guide you with integrity, insight, and a personalized approach.'
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
