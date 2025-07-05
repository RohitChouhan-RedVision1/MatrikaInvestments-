"use client"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import formatDate from "@/lib/formatDate";
import styles from './ourposts.module.css'
import Image from "next/image";
import { IoCalendar } from "react-icons/io5";
import SectionHeading from "@/components/landing/section-heading/sectionheading";

export function OurPosts() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/blogs/dashboardblogs");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={`${styles.ourBlog} section`}>
            <div className="container">
                <div className={`${styles.ourBloghRow} rvRow`}>
                    <div className={`${styles.ourBloghCol} rvCol`}>
                        <SectionHeading
                            maintitle='blog / post'
                            title='Finance insights, updates'
                            secondPart='and trends'
                            paragraph=''
                        />

                    </div>
                    <div className={`${styles.ourBloghCol1} rvCol`}>
                        <div className={`${styles.sectionbtn}`}>
                            <Link href="/blogs" className="btn btn-primary">view all post</Link>
                        </div>
                    </div>
                </div>
                <div className={`${styles.ourBlogsRow} rvRow`}>
                    {data?.map((item, index) => (
                        <div className={`${styles.ourBlogsCol} rvCol`} key={index}>
                            <div className={styles.postItem}>
                                <Link href={`blogs/${item.slug}`}>
                                    <div className={styles.postFeaturedImage}>
                                        <Image src={item?.image?.url} alt="" width={500} height={100} />
                                    </div>
                                    <div className={styles.postItemBody}>
                                        <div className={styles.postItemMeta}>
                                            <ul>
                                                <li><IoCalendar size={20} /></li>
                                                <li>{formatDate(item?.createdAt)}</li>
                                            </ul>
                                        </div>
                                        <h5 className="text-line" style={{'--textline': 3}}>{item?.posttitle}</h5>
                                        <span className={styles.readmoreBtn}>read more</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
