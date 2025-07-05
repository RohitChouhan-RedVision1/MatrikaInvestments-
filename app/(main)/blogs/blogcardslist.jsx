import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './blogpage.module.css'

const BlogCardsList = ({ item }) => {
    return (
        <div className={`${styles.blogreletedcard}`}>
            <Link href={`/blogs/${item?.slug}`}>
                <div className={`${styles.blogreletedcardbody}`}>
                    <Image className="" src={item?.image?.url} alt={item?.image?.url} width={140} height={100} />
                    <div className={`${styles.blogreletedcardtitle}`}>
                        <h6 className="text-line" style={{'--textline':2}}>{item?.posttitle}</h6>
                        <span>Read More</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogCardsList