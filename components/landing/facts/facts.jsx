import Image from 'next/image';
import styles from './Facts.module.css';
import { CircleArrowLeft } from 'lucide-react';
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default function FactsSection() {
      const dataCounter = [
        {
            title: "Years of experience",
            icon: "/images/icon-fact-counter-1.svg",
            valData:"30",
            valDatatext:"",
            valDatapules:"+",
            
        },
        {
            title: "Client success rate",
            icon: "/images/icon-fact-counter-2.svg",
            valData:"95",
            valDatatext:"%",
            valDatapules:"+",
             
        },
        {
            title: "Global research",
            icon: "/images/icon-fact-counter-3.svg",
            valData:"20",
            valDatatext:"",
            valDatapules:"+",
        
        },
        
    ];
    return (
        <div className={`${styles.factCounter} section`}>
            <div className="container">
                <div className={`${styles.factCounterRow} rvRow`}>
                    <div className={`${styles.factCounterCol1} rvCol`}>
                        <div className={styles.factCounterImage}>
                            <div className={styles.factCounterImg}>
                                <figure className="image-anime">
                                    <Image src="/images/facts.webp" alt="Fact Counter" width={1600} height={300} />
                                </figure>
                            </div>
                            {/* <div className={styles.factCounterSkillbar}>
                                <Image src="/images/fact-counter-skillbar-img.png" alt="Skillbar" width={500} height={300} />
                            </div> */}
                        </div>
                    </div>
                    <div className={`${styles.factCounterCol1} rvCol`}>
                        <div className={styles.factCounterContent}>
                            <SectionHeading
                            maintitle='some facts '
                            title='Key facts our'
                            secondPart='expertise'
                            paragraph='Our expertise is built on years of industry experience, proven financial strategies and a commitment to client success.'
                        />
                            <div className={`${styles.factCounterBoxList} rvRow`}>
                                {dataCounter?.map((item, index) => (

                                <div key={index} className={`${styles.factCounterBox} rvCol`}>
                                    <div className={styles.iconBox}>
                                        <Image src={item.icon} alt="Icon 1" width={50} height={50} />
                                    </div>

                                    <div className={styles.factCounterBoxContent}>
                                        <h2><span className="counter">{item.valData}</span>{item.valDatatext? item.valDatatext :'' }{item.valDatapules? item.valDatapules :'' }</h2>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                    ))}
                          
                            </div>
                            <div className={styles.factCounterList}>
                                <ul>
                                    <li className=''><span><CircleArrowLeft color='var(--rv-secondary)' /></span>Strategic financial planning</li>
                                    <li className=''><span><CircleArrowLeft color='var(--rv-secondary)' /></span>Expert investment advisory</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}