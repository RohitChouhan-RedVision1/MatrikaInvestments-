
import { InputForm } from "@/components/book-appointment-form/bookAppointmentForm";
import Image from "next/image";
import styles from "./appointment.module.css";;
import Link from "next/link";
import { getSiteData } from "@/lib/functions";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export default async function BookAppointment() {
  const siteData = await getSiteData();
  return (
    <section>
      {/* <Banner title="Contact us" /> */}
      <div className="">
        <RvBreadcrumbs
          maintitle="Schedule Your Appoinment"
        // lastTitle={post?.posttitle}
        />
      </div>
   
      <div className={`${styles.AppoinmentFormSection} section`}>
        <div className="container">
          <div className={`${styles.contactsfRow} rvRow`}>
           
            <div className={`${styles.contactsfCol} rvCol`}>
                 <SectionHeading
                            maintitle='Appoinment'
                            title='Schedule Your '
                            secondPart='Appoinment'
                        />
              <InputForm sitedata={siteData} />
            </div>
          </div>
        </div>
      </div>
  
    </section>
  );
};
