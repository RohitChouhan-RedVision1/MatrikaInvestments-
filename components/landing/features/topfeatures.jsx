'use client';
import styles from './topfeatures.module.css';
import React from 'react';
import { calculators } from '@/data/calculators';
import Image from 'next/image';
import Link from 'next/link';
import { toolsdata } from "@/data/commanData";
import SectionHeading from "@/components/landing/section-heading/sectionheading";

const TopFeatures = () => {
    const cardData = [
        // {
        //     animation: "fade-right",
        //     link: "/tools/download-forms",
        //     title: 'Download Form',
        //     images: {
        //         default: '/images/cloud-file.svg',
        //         hover: '/images/cloud-file.svg'
        //     }
        // },
        {
            animation: "fade-up",
            link: "/tools/calculators",
            title: 'Financial Calculator',
            images: {
                default: '/images/features/calculator.svg',
                hover: '/images/calculator.svg'
            }
        },
        {
            animation: "fade-up",
            link: "/tools/financial-health",
            title: 'Financial Health',
            images: {
                default: '/images/features/financial-health.svg',
                hover: '/images/medical-report.svg'
            }
        },
        {
            link: "/tools/risk-profile",
            animation: "fade-right",
            title: 'Risk Profile',
            images: {
                default: '/images/features/risk-profile.svg',
                hover: '/images/features/risk-profile.svg'
            }
        },
        {
            link: "/tools/pay-premium-online",
            animation: "fade-right",
            title: 'Pay Premium Online',
            images: {
                default: '/images/features/pay-premium-online.svg',
                hover: '/images/vip-card.svg'
            }
        },
        {
            link: "/tools/useful-links",
            animation: "fade-right",
            title: 'Useful Links',
            images: {
                default: '/images/features/useful-links.svg',
                hover: '/images/link.svg'
            }
        }
    ];
    return (
        <div className={`${styles.ourFeature} section`}>
            <div className='container'>
                <div className={`${styles.ourFeatureRow} ${styles.ourFeaturehadding} rvRow`}>
                    <div className={`${styles.ourFeatureHadding} rvCol`}>                      
                         <SectionHeading
                            maintitle='Our Feature '
                            title='Key features of our finance'
                            secondPart='and consulting'
                            paragraph=''
                        />
                    </div>
                    <div className={`${styles.ourFeaturebttone} rvCol`}>
                        <div className="">
                            <Link href="/contact-us" className="btn btn-secondary">Contact Now</Link>
                        </div>
                    </div>
                </div>

                <div className={`${styles.ourFeatureRow} rvRow`}>
                    {toolsdata?.map((item, index) => (
                        <Link href={item.link} key={index} className={`${styles.ourFeatureItem} rvCol`}>
                            <div>
                                <div className={styles.iconBox}>
                                    <Image src={item.icon} alt="Feature Icon" width={200} height={200} />
                                </div>
                                <div className={styles.featureItemContent}>
                                    <h5>{item.name}</h5>
                                    <p>{item.disc}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* <div className={styles.ourFeatureFooter}>
                    <p>
                        <span>Free</span> Let&apos;s make something great work together.{' '}
                        <Link href="/contact-us">Get Free Quote</Link>
                    </p>
                </div> */}
            </div>
        </div>
    );
};

export default TopFeatures;
