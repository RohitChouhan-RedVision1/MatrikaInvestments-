import Link from "next/link";
import styles from './howwork.module.css';
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default function HowWork() {
        const howitworkData = [
        
        {
            title: "Understand the Client's Profile and Objectives",
            content: "We start by understanding your financial goals, challenges, and priorities to tailor a personalized strategy that suits your objectives.",
            
        },
        {
            title: "Recommend Suitable Mutual Fund Schemes",
            content: "We analyze your risk profile and goals to recommend mutual fund schemes that align with your investment horizon and financial objectives.",
            
        },
        {
            title: "Execute, Monitor, and Review Investments",
            content: "We implement your investment plan, continuously monitor performance, and regularly review it to ensure alignment with your evolving financial goals.",
            
        },
    ];
    return (
        <div className={`${styles.howitWork} section`}>
            <div className="container">
                <div className={`${styles.howitworkRow} rvRow`}>
                    <div className={`${styles.howitworkCol1} rvCol`}>
                        <div className={`${styles.howitwshadding}`}>
                              <SectionHeading
                                    maintitle='how it work'
                                    title='Our process for financial'
                                    secondPart='success'
                                    paragraph='Our process is designed to guide you every step of the way. From initial consultation to personalized strategy development.'
                                />
                          
                            <div className={`${styles.howitworkBtn}`}>
                                <Link href="/contact-us" className="btn btn-secondary">learn more</Link>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.howitworkCol1} rvCol`}>
                        <div className={`${styles.workStepsBox}`}>
                            {howitworkData?.map((item, index) => (
                            <div key={index} className={`${styles.workStepsItems}`}>
                                <div className={`${styles.workStepsContent}`}>
                                    <h6 className="">step-0{index + 1}</h6>
                                    <h5>{item.title}</h5>
                                    <p>{item.content}</p>
                                </div>
                                <div className={`${styles.workStepsNo}`}>
                                    <h2>0{index + 1}</h2>
                                </div>
                            </div>
                    ))}
  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
