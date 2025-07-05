'use client'
import Image from 'next/image'
import React from 'react'
import styles from './WhyChooseUs.module.css'
import { CircleArrowLeft } from 'lucide-react'
import SectionHeading from "@/components/landing/section-heading/sectionheading";

const WhyChooseUs = () => {
    const data = [
        {
            title: "Deep Industry Experience",
            description: "30+ years of industry expertise, crafting winning strategies in Mutual Funds and Commercial Insurance. Your financial security, our priority. Choose experience, choose us."
        },
        {
            title: "Consulting Expertise",
            description: "Service over sales defines us. Our consulting respects your time – we connect only when it suits you, ensuring no disruptions. Your convenience, our commitment."
        },
    ]
    return (
        <div className={`${styles.whyChooseUs} section`}>
            <div className="container">
                <div className={`${styles.whyChooseRow} rvRow`}>
                    <div className={`${styles.whyChoosecol1} rvCol`}>
                        <div className={`${styles.whyChooseContent} rvRow`}>
                            <div className={`${styles.whyChoosehadding} rvCol`}>
                             <SectionHeading
                                maintitle='Why Choose Us'
                                title='Why trust'
                                secondPart='our finances'
                                paragraph=''
                                />
                                </div>
                            <div className={`${styles.whyChooseBoxList} rvCol`}>
                                <div className={`${styles.whyChooseBoxRow} rvRow`}>
                                    {data.map((item, index) => (
                                    <div key={index} className={`${styles.whyChooseBox} rvCol`} >
                                        <div className={styles.iconBox}>
                                            <Image src={`/images/icon-why-choose-${index + 1}.svg`} alt="" width={50} height={50} />
                                        </div>
                                        <div className={styles.whyChooseBoxContent}>
                                            <h6>{item.title}</h6>
                                            <p className='text-justify'>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className={`${styles.whyChooseList} rvCol`} >
                                <ul>
                                    <li className=''><span><CircleArrowLeft color='var(--rv-secondary)' /></span> Strategic Financial Planning</li>
                                    <li className=''><span><CircleArrowLeft color='var(--rv-secondary)' /></span> Expert Investment Advisory</li>
                                </ul>
                            </div>
                                </div>

                    </div>

                    <div className={`${styles.whyChoosecol2} rvCol `} >
                        <div className={styles.whyChooseImage}>
                            <div className={styles.whyChooseImg1}  >
                                <figure className="image-anime">
                                    <Image src="/images/why-choose-us.webp" alt="" width={1500} height={300} />
                                </figure>
                            </div>
                           
                            <div className={styles.whyChooseContactCircle}>
                                <Image src="/images/contact-us-img.svg" alt="" width={100} height={100} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs;