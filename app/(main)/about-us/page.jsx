"use client";
import AboutSection from "@/components/landing/about-us/aboutus";
import Image from "next/image";

import styles from "./about.module.css";
import Link from "next/link";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";
import SectionHeading from "@/components/landing/section-heading/sectionheading";
import SectionHeadingPage from "@/components/landing/section-heading/sectionheadingPage";
import AboutSectionPage from "@/components/landing/about-us/aboutusPage";

// console.log(Breadcrumbs);
export default function AboutUs() {
  const approachData = [
    {
      title: "Our Vision",
      icon: "/images/icon-our-vision.svg",
      image: "/images/vision.webp",
      altIcon: "Our Vision Icon",
      altImage: "Vision Image",
      description:
        "To be the most trusted wealth partner, redefining financial success for generations to come.",
    },
    {
      title: "Our Mission",
      icon: "/images/icon-our-mission.svg",
      image: "/images/mission.webp",
      altIcon: "Our Mission Icon",
      altImage: "Mission Image",
      description:
        "To empower individuals and families to achieve financial freedom through personalized, transparent, and disciplined wealth management.",
    },

    {
      title: "Our Core Values",
      icon: "/images/icon-our-value.svg",
      image: "/images/values.webp",
      altIcon: "Our Value Icon",
      altImage: "Values Image",
      description:
        "Our core values include accessibility, empathy, trust, innovation, excellence, collaboration, and social responsibility. We are committed to making financial services accessible to all, understanding our client’s unique needs, building trust through integrity, driving innovation, and striving for excellence.",
    },
  ];
  return (
    <div>
      <div className="">
        <RvBreadcrumbs
          maintitle="about us"
        />
      </div>
      {/* <Banner title="About Us" /> */}
      <AboutSectionPage />
      <div className={`${styles.aboutSection} section`}>
        <div className="container ">
          <div className={`${styles.aboutSectionhRow} rvRow`}>
            <div className={`${styles.aboutSectionhCol1}`}>

              <SectionHeadingPage
                maintitle='our approach'
                title='Customized strategies for'
                secondPart='financial success'
                paragraph=''
              />
            </div>
            <Link
              href="/contact-us"
              className="btn btn-secondary"
            >
              Contact now
            </Link>
          </div>
          <div className={styles.missionVissionRow}>
            {approachData.map((item, index) => (
              <div key={index} className={styles.missionVissionCol}>
                <div className={styles.missionVissionItem}>
                  <div className={styles.missionVissionHeader}>
                    <div className={styles.iconBox}>
                      <Image
                        src={item.icon}
                        alt={item.altIcon}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className={styles.missionVissionContent}>
                      <h5>{item.title}</h5>
                      <p>{item.description}</p>
                    </div>
                  </div>
                  <div className={styles.missionVissionImage}>
                    <figure className="image-anime">
                      <Image
                        src={item.image}
                        alt={item.altImage}
                        width={300}
                        height={300}
                      />
                    </figure>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
