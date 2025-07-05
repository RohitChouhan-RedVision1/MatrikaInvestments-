"use client" 

import Image from "next/image";
import styles from './faq.module.css';

import React, { useEffect, useState } from "react";
import SectionHeading from "@/components/landing/section-heading/sectionheading";

const FaqSection = () => {
  const [faqs, setFaq] = useState([])

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };
  const fetchFaq = async () => {
    try {
      const data = await fetch("/api/faqs");
      if (data.ok) {
        const maindata = await data.json();
        setFaq(maindata);
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <div className={`${styles.ourFaqs} section`}>
      <div className="container">
        {/* <div className="section-row"> */}
          <div className={`${styles.ourFaqsHadding}`}>
                 <SectionHeading
                    maintitle='faqs'
                    title='Your most frequently asked'
                    secondPart='questions answered'
                    paragraph=''
                />
        </div>
          {/* <div className="col-lg-6">
            <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
              <Link href="/#faqs" className="btn-default btn-highlighted">
                view all FAQs
              </Link>
            </div>
          </div> */}
        {/* </div> */}
        <div className={`${styles.ourFaqsRow} rvRow`}>
          <div className={`${styles.ourFaqsCol} rvCol`}>
            <div className={`${styles.ourFaqsImage}`}>
                  <Image
                    src="/images/faq.webp"
                    alt="FAQ Image"
                    width={1500}
                    height={500}
                  />
            
            </div>
          </div>
          <div className={`${styles.ourFaqsCol} rvCol`}>
            <div className={`${styles.ourFaqsContent}`}>
              {faqs.map((faq, index) => (
                <div key={index} className={`${styles.ourFaqsCard}`}>
                  <button
                    onClick={() => toggle(index)}
                    className={`${styles.FaqSSbtitle} ${openIndex === index ? styles.active : ""}`}
                  >
                    <span>{faq.question}</span>
                    <span className={`${styles.FaqSectionButton}`}>
                      {openIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className={`${styles.FaqSectiondisc}`}>
                      <div className="" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
