import React from 'react'
import styles from './section-heading.module.css';

function SectionHeading({maintitle, title, secondPart, paragraph }) {
    return (
        <div className={styles.sectionTitle}>
            {maintitle?<h6 className={styles.miniTitle}>{maintitle}</h6>:null}
            {title?<h3 className={styles.headingTitle} data-cursor="-opaque">{title} {secondPart?<span>{secondPart}</span>:null}</h3>:null}
            {paragraph? <p data-aos="fade-up" className={styles.paragraph} data-aos-anchor-placement="bottom" >{paragraph}</p>:null}
        </div>

    )
}

export default SectionHeading;
