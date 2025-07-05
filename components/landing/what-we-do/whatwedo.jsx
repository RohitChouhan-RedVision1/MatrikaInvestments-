import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IoArrowUpCircle } from "react-icons/io5";
import styles from './whatwedo.module.css'
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default function WhatWeDo() {
    return (
        <div className={`${styles.whatwedo} section`}>
            <div className="container">
                <div className={`${styles.whatWeDoCRow} rvRow`}>
                    <div className={`${styles.whatWeDoCCol1} rvCol`}>
                        <div className={`${styles.whatWeDoContent}`}>
                             <SectionHeading
                                maintitle='what we do'
                                title='Driving financial growth'
                                secondPart='and success'
                                paragraph='We provide expert financial and consulting solutions designed to foster growth, stability, and long-term success.'
                            />
                            <div className={`${styles.whatWeDoList}`}>
                                <ul >
                                    <li><CircleArrowLeft  />strategic financial planning</li>
                                    <li><CircleArrowLeft  />expert investment advisory</li>
                                    <li><CircleArrowLeft  />risk assessment & mitigation</li>
                                    <li><CircleArrowLeft  />retirement & future planning</li>
                                </ul>
                            </div>
                            <div className="">
                                <Link href="/contact-us" className="btn btn-primary">contact now</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.whatWeDoCCol2} rvCol`}>
                        <div className={`${styles.whatWeDoImages}`}>
                            <div className={`${styles.whatDoWeImg1}`}>
                                    <Image src="/images/what-we-do.webp" alt="what we do" width={1500} height={500} />
                            </div>
                            <div className={`${styles.experienceCounterBox}`}>
                                <div className={`${styles.experienceCounterNo}`}>   
                                    <h2><span className="counter">30</span>+</h2>
                                </div>
                                <div className={`${styles.experienceCounterContent}`}>
                                    <p>Years of experience in finance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}