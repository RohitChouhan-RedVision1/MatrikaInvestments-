import BlogCards from '@/components/landing/blog-cards/blogcards';
import React, { Suspense } from 'react';
import Loading from './loading';
import Banner from '@/components/section-banner/banner';
import { getLatestBlogs } from '@/lib/functions';
import  RvBreadcrumbs  from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

import styles from './blogpage.module.css'

export default async function Blogs() {
    const data = await getLatestBlogs();
    return (
        <div className="">
            <div className="">
             <RvBreadcrumbs 
            maintitle="Blogs"
            />
            </div>
        <section className={`${styles.blogpageSection} section`}>
            {/* <Banner title="Blogs" /> */}
            <div className='container'>
                <div className={`${styles.blogpageRow} rvRow`}>
                    <Suspense fallback={<Loading />}>
                        {data?.map((item, index) => (
                            <div key={index} className={`${styles.blogpageCol} rvCol`}>
                                <BlogCards item={item} />
                            </div>
                        ))}
                    </Suspense>
                </div>
            </div>
        </section>
                        </div>
    )
}