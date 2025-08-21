"use client";
import styles from "./ourservice.module.css";
// import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import SectionHeading from "@/components/landing/section-heading/sectionheading";
import { servicesdata } from "@/data/commanData";

export default function OurServices() {
 


  return (
    <div className={`${styles.ourServices} section`}>
      <div className="container">
        <div className={styles.ourServicesRow}>
          <div className={styles.colspan1}>
            <div className={styles.ourServiceContent}>
            <SectionHeading
                            maintitle='services'
                            title='Expert finance & consult services'
                            secondPart='for success'
                            paragraph=''
                        />
              {/* <div
                className={styles.serviceContentBtn}
                data-aos="fade-up"
                data-aos-anchor-placement="bottom"
              >
                <Link href="#services" className="btn-default btn-highlighted">
                  all services
                </Link>
              </div> */}
            </div>
          </div>

          <div className={`${styles.colspan2}`}>
            <div
              className={`${styles.ourServiceList}`}
            >
              {servicesdata?.map((item, index) => (
                <Link
                  href={`/services/${item?.slugUrl}`}
                  key={index}
                  className={styles.serviceItemLink}
                >
                  <div className={styles.serviceItem}>
                    <div className={styles.serviceNo}>
                      <h2>0{index + 1}</h2>
                    </div>
                    <div className={styles.serviceContentBox}>
                      <div className={styles.iconBox}>
                        <img src={`${item?.iconeImg}`} alt={item?.name} />
                      </div>
                      <div className={styles.serviceItemContent}>
                        <h3>{item?.title}</h3>
                        <p className="line-clamp-5 text-line" style={{'--textline':4}}>{item?.shortDescription}</p>
                        <span className={styles.serviceBtn}>
                          <img src="/images/arrow-white.svg" alt="Arrow icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* <div className={styles.serviceFooter} data-wow-delay="0.8s">
              <p>
                Let&apos;s make something great work together.{" "}
                <Link href="/contact-us">Get Free Quote</Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
