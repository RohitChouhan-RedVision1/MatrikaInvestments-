import formatDate from "@/lib/formatDate";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import { ConnectDB } from "@/lib/db/ConnectDB";
import BlogsModel from "@/lib/models/BlogModel";
import styles from '../blogpage.module.css'

import BlogCardsList from "@/app/(main)/blogs/blogcardslist";
import Link from "next/link";
// import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/io5";

import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Loader from "@/components/admin/common/Loader";
import { getSiteData, getSocialMedia } from "@/lib/functions";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";
const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-primary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-primary)]" />,
    Linkedin: <FaLinkedin className="text-[var(--rv-primary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-primary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-primary)]" />,
  };
// FETCH DATA WITH AN API
const getData = async (slug) => {
    const data = await BlogsModel?.findOne({ slug }).select('-_id, -keywords');
    return data ? data : [];
};

const getRecentBlog = async (slug) => {
    await ConnectDB();
    const data = await BlogsModel?.find({}).select('-_id, -content');
    return data ? data.map(item => item.toObject()) : [];
};

// SEO - dynamic
export const generateMetadata = async ({ params }) => {
    const { slug } = params;

    const post = await getData(slug);
    return {
        title: post?.metatitle,
        description: post?.description,
        keywords: post?.keywords,
    };
};

const SinglePostPage = async ({ params }) => {
    const siteData = await getSiteData();
    const socialMedia = await getSocialMedia();
    const { slug } = await params;
    const post = await getData(slug);
    const recentPost = await getRecentBlog();
    function createMarkup() {
        return { __html: post?.content }
    }

    return (
        <div className="">
            <div className="">
                <RvBreadcrumbs
                    maintitle="Blogs"
                    maintitleLink='/blogs'
                    lastTitle={post?.posttitle}

                />
            </div>
            <section className={`${styles.blogpDSection} section`}>
                {post ?
                    (
                        <div className="container">
                            <div className={`${styles.blogpDRow} rvRow`}>
                                <div className={`${styles.blogpDCol} rvCol`}>
                                    <div className={`${styles.blogpdccontent}`}>
                                        <div className="">
                                            <h4 className=''>{post?.posttitle}</h4>
                                            <div className={`${styles.blogpdcflex}`}>
                                                <div className="">
                                                    <span className="">Published On </span>
                                                    <span className="">
                                                        {formatDate(post?.createdAt)}
                                                    </span>
                                                </div>
                                                |
                                                <div className={`${styles.followus}`}>
                                                    <span >{socialMedia.length !== 0 && "Follow Us"}</span>
                                                    {socialMedia
                                                        .filter((link) => !link.isHidden)
                                                        .map((link, index) => (
                                                        <Link key={index} target="_blank" href={link.url}>
                                                            <div
                                                            className={`${styles.followIcon}`}
                                                            >
                                                            {iconMap[link.title] || (
                                                                <FaXTwitter  />
                                                            )}
                                                            </div>
                                                        </Link>
                                                        ))}
                                                     
                                                </div>
                                            </div>
                                        </div>
                                        {post?.image?.url && (
                                            <div>
                                                <Image src={post?.image?.url}
                                                    alt={post?.image?.url}
                                                    width={900}
                                                    height={900}
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                        )}
                                        <div className="">
                                            <h1 className="">{post?.title}</h1>
                                            <div className="">
                                                {post && (
                                                    <Suspense fallback={<div>Loading...</div>}>
                                                        <div dangerouslySetInnerHTML={createMarkup()} />
                                                    </Suspense>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.blogpDRCol} rvCol`}>
                                    <div className="">
                                        <h4 className="">Recent Posts</h4>
                                        <div className="">
                                            {recentPost?.reverse().slice(0, 6).map((item, index) => (
                                                <div key={index}>
                                                    {post?.slug !== item?.slug && (
                                                        <Suspense fallback={<Loading />}>
                                                            <BlogCardsList item={item} />
                                                        </Suspense>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {/* <BannerForm /> */}
                                        <div className={`${styles.followus} mt-3`}>
                                            <span className="">{socialMedia.length !== 0 && "Follow Us"}</span>
                                                        {socialMedia
                                                        .filter((link) => !link.isHidden)
                                                        .map((link, index) => (
                                                        <Link key={index} target="_blank" href={link.url}>
                                                            <div
                                                            className={``}
                                                            >
                                                            {iconMap[link.title] || (
                                                                <FaXTwitter className="text-[var(--rv-primary)]" />
                                                            )}
                                                            </div>
                                                        </Link>
                                                        ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (<Loader />)
                }
            </section>
        </div>

    );
};

export default SinglePostPage;