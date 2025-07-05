import Link from 'next/link'
import styles from './blogcards.module.css'
import formatDate from '@/lib/formatDate'
import Image from "next/image";
import { IoCalendar } from "react-icons/io5";
const BlogCards = ({ item }) => {
    return (
        <div className="">
            <div className={styles.postItem}>
                    <Link href={`/blogs/${item.slug}`}>
                <div className={styles.postFeaturedImage}>
                        <Image
                        src={item?.image?.url}
                        alt={item?.image?.title}
                        width={400}
                        height={400}
                      />
                </div>
                <div className={styles.postItemBody}>
                    <div className={styles.postItemMeta}>
                        <ul>
                            <li><IoCalendar size={20} /> {formatDate(item?.createdAt)}</li>
                        </ul>
                    </div>
                    <h6 className='text-line'  style={{'--textline': 3}} > {item?.posttitle} </h6>
                    <span  className={styles.readmoreBtn}>read more</span>
                </div>
                    </Link>

            </div>
            {/* <Link href={`blogs/${item.slug}`}>
                <div className="max-w-sm max-h-96 min-h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href={`blogs/${item.slug}`}>
                        <img className="rounded-t-lg" src={item?.image?.url} alt={item?.image?.url} />
                    </Link>
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.posttitle}</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.posttitle}</p>
                    </div>
                </div>
            </Link> */}
        </div>
    )
}

export default BlogCards