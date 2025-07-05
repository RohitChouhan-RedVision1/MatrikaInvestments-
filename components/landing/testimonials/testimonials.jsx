"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import styles from './testimonials.module.css';
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from "next/image";
import SectionHeading from "@/components/landing/section-heading/sectionheading";



export function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        setTestimonials(result);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function createMarkup(post) {
    return { __html: post };
  }

  return (
    <div className={`${styles.ourtestimonial} section`}>
      <div className="container">
        <div className={`${styles.ourtestimonialRow} rvRow`}>
          {/* Left Content */}
          <div className={`${styles.ourtestimonialCol} rvCol`}>
            <div className={styles.testimonialcontent}>
              <SectionHeading
                    maintitle='Our Testimonial'
                    title='1250+ Customers Say'
                    secondPart='About Our Finance'
                    paragraph='With over 1,250 satisfied clients, our finance and consulting services have earned praise for reliability, personalized guidance, and impactful results.'
                />
              <div className="testimonial-btn">
                <Link href="/contact-us" className="btn btn-secondary">Contact Now</Link>
              </div>
            </div>
          </div>

          {/* Right Slider */}
          <div className={`${styles.ourtestimonialCol2} rvCol`}>
            <div className={styles.testimonialsliderbox}>
              <div className={styles.testimonialslider}>
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  loop={true}
                >
                  <div className="swiper-wrapper" data-cursor-text="Drag">
                    {testimonials?.map((testimonial, index) => (
                      <SwiperSlide key={index}>
                        <div className={styles.testimonialitembox}>
                          <div className={styles.testimonialheader}>
                            <div className={styles.customerlogo}>
                              <Image
                                src="/logo.webp"
                                alt="logo"
                                width={150}
                                height={50}
                                
                              />
                            </div>
                            <div className={styles.testimonialquotes}>
                              <Image src="/images/testimonial-quotes.svg" alt="Quotes" width={50} height={50} />
                            </div>
                          </div>
                          <div className={styles.testimonialbody}>
                              <span
                                className=""
                                dangerouslySetInnerHTML={createMarkup(testimonial?.content)}
                              ></span>
                              <button
                                
                                onClick={() => {
                                  setSelectedTestimonial(testimonial);
                                  setShowModal(true);
                                }}
                              >
                                Read More
                              </button>
                          </div>
                          <div className={styles.testimonialauthor}>
                            <div className={styles.authorimage}>
                                <Image src={testimonial?.image.url} alt={testimonial?.authorName} width={120} height={120} />
                            </div>
                            <div className={styles.authorcontent}> 
                              <h3>{testimonial?.author} / <span>{testimonial?.designation} </span></h3>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                  <div className={styles.testimonialpagination}></div>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Full Testimonial */}
      {showModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg relative shadow-lg">
            <button
              className="absolute top-2 right-3 text-black text-2xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">{selectedTestimonial?.author}</h3>
            <p dangerouslySetInnerHTML={createMarkup(selectedTestimonial?.content)}></p>
          </div>
        </div>
      )}
    </div>
  );
}
