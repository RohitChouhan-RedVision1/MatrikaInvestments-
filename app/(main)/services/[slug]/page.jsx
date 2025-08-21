
import { servicesdata } from '@/data/commanData';
import styles from './Services.module.css'
import  RvBreadcrumbs  from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";
import Link from "next/link";
export default function ServicePage({ params }) {
  const { slug } = params;
 

  const service = servicesdata.find((item) => item?.slugUrl === slug);
  return (
    <div className="">
          <RvBreadcrumbs 
            maintitle={service.title}
            />
    <div className={`${styles.servicesPage} section`}>
      
        <div className="container">
          <h1 className={styles.rvsptitle}>{service.fullTitle}</h1>
       <div className={`${styles.rvcardBody} mb-10 justify-center`}>
          <Link href={service.getInTouchButtonLink} className="btn btn-primary">
            {service.getInTouchButton}
          </Link>
          </div>
          <div className={`${styles.rvspcontent}`}>
            
          <div dangerouslySetInnerHTML={{ __html: service.description }} />
          </div>
           <div className="">{service.getInTouchDescription}</div>
          <div className={`${styles.rvcardBody} mt-5 mb-5 justify-start`}>
            <Link href={service.getInTouchButtonLink} className="btn btn-primary">
              {service.getInTouchButton}
            </Link>
          </div>
        </div>
      </div>
     
    </div>
  );
}