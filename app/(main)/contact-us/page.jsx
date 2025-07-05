
import { InputForm } from "@/components/contact-form/contactForm";
import Image from "next/image";
import styles from "./contact.module.css";;
import Link from "next/link";
import Banner from "@/components/section-banner/banner";
import { getSiteData } from "@/lib/functions";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default async function ContactUs() {
  const siteData = await getSiteData();
  return (
    <section>
      {/* <Banner title="Contact us" /> */}
      <div className="">
        <RvBreadcrumbs
          maintitle="Contact Us"
        // lastTitle={post?.posttitle}

        />
      </div>
      <div className={`${styles.pageContactUs} section`}>
        <div className="container">
          <div className={`${styles.contactInfoRow} rvRow`}>
            <div className={`${styles.contactInfoItem} rvCol`}>
              <div className={`${styles.contactInfoCard}`}>
                  <Image
                    src="/images/call-us.webp"
                    alt="Contact Info"
                    width={500}
                    height={300}
                  />
                <Link href={`tel:${siteData.mobile}`}>
                  <div className={styles.contactInfoBody}>
                    <div className={styles.iconBox}>
                      <Image
                        src="/images/icon-phone.svg"
                        alt="Phone Icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.contactInfoContent}>
                      <h5>call us any time!</h5>
                      <p>{siteData?.mobile}</p>
                      <p>{siteData?.mobile2}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className={`${styles.contactInfoItem} rvCol`}>
              <div className={`${styles.contactInfoCard}`}>
                  <Image
                    src="/images/mail.webp"
                    alt="Email Info"
                    width={500}
                    height={300}
                  />
                <Link href={`mailto:${siteData.email}`}>
                  <div className={styles.contactInfoBody}>
                    <div className={styles.iconBox}>
                      <Image
                        src="/images/icon-mail.svg"
                        alt="Mail Icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.contactInfoContent}>
                      <h5>send us e-mail</h5>
                      <p>{siteData?.email}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className={`${styles.contactInfoItem} rvCol`} >
              <div className={`${styles.contactInfoCard}`}>

                  <Image
                    src="/images/address.webp"
                    alt="Location Info"
                    width={500}
                    height={300}
                  />
               <Link  href={siteData.mapurl}>
                  <div className={styles.contactInfoBody}>
                    <div className={styles.iconBox}>
                      <Image
                        src="/images/icon-location.svg"
                        alt="Location Icon"
                        width={50}
                        height={50}
                        className="imgicon"
                      />
                    </div>
                    <div className={styles.contactInfoContent}>
                      <h5>finance office address</h5>
                      <p>{siteData?.address}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.contactFormSection} section`}>
        <div className="container">
          <div className={`${styles.contactsfRow} rvRow`}>
            <div className={`${styles.contactsfCol} rvCol`}>
              <div className={styles.contactFormImg}>
                <Image
                  src="/images/contact-us-img.webp"
                  alt="Contact Us"
                  width={600}
                  height={400}
                />
              </div>
            </div>
            <div className={`${styles.contactsfCol} rvCol`}>
             



                 <SectionHeading
                            maintitle='contact us'
                            title='Get in Touch'
                            secondPart='with Us'
                            paragraph=' Have questions or need assistance? Reach out to us today!
                  We&apos;re here to provide expert solutions and friendly
                  support.'
                        />
              <InputForm />
            </div>
          </div>
        </div>
      </div>
      <div className={styles?.googleMap}>
        <div className={styles?.googleMapIframe}>
          <iframe
            src={siteData?.iframe}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
