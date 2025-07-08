"use client"
import styles from './heroSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@/lib/ScrollSmoother'


export default function HeroSection( {siteData}) {

    return (
        <div className={`${styles.hero} section`}>
            <div className="container">
                <div className={styles.heroRow}>
                    <div className={styles.rvhrContent}>
                        <div className={styles.heroContent}>
                            <div className="">
                                <h6 className="">Welcome to {siteData?.websiteName}</h6>
                                <h1 className={`${styles.textAnimeStyle} `} data-cursor="-opaque">
                                    <span className=''>Empowering</span> your financial success journey
                                </h1>
                                <p data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                    Guiding you with expert insights and strategic solutions to achieve financial growth, stability, and long-term success.
                                </p>
                            </div>
                            <div className={styles.heroContentBody} data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                <div className={styles.heroBtn}>
                                    <Link href="/contact" className="btn btn-secondary">Get Started</Link>
                                </div>
                                {/* <div className={styles.heroIntroductionVideo}>
                                        <div className={styles.videoPlayButton}>
                                            <Link href="https://www.youtube.com/watch?v=Y-x0efG1seA" className="popup-video" data-cursor-text="Play">
                                                <Image src="/images/icon-play.svg" alt="Play Icon" width={20} height={20} />
                                            </Link>
                                            <p>Introduction</p>
                                        </div>
                                    </div> */}
                            </div>
                            <div className={styles.heroContentFooter} data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                <h2 className="wow fadeInUp" data-wow-delay="0.6s">We&apos;re working with:</h2>
                                <div className={styles.heroClientSlider}>
                                    <Swiper
                                        spaceBetween={30}
                                        slidesPerView={4}
                                        autoplay={{
                                            delay: 2000,
                                            disableOnInteraction: false,
                                        }}
                                        modules={[Autoplay]}
                                        loop={true}
                                    >
                                        {[1, 7, 33, 9, 17, 39, 20, 22, 19, 1, 7, 33, 9, 17, 39, 20, 22, 19].map((logo, index) => (
                                            <SwiperSlide key={index}>
                                                <div className={styles.clientLogo}>
                                                    <Image src={`/images/mf/${logo}.webp`} alt={`Client Logo ${logo}`} width={100} height={100} />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rvhrImage}>
                        <div className={styles.heroImage}>
                            <div className={styles.heroImg}>
                                    <Image src="/images/hero-img.webp" alt="Hero Image" width={600} height={500} />
                            </div>
                            <div className={styles.companyExperience}>
                                <h3><span className="counter">30</span>+</h3>
                                <p>Years of experience in finance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
