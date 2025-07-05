import React from 'react';
import styles from './breadcrumbs.module.css';
import Link from 'next/link'; // Use Next.js Link for client-side routing

function RvBreadcrumbs({ maintitle, maintitleLink, lastTitle, lastTitleLink, lastTitle2,lastTitle2Link, lastTitle3,lastTitle3Link }) {
  return (
    <div className={styles.breadcrumbsTitle} >
      <div className="container">
      <ul className={styles.breadcrumbList}>
        <li>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
        </li>
        {maintitle && <li className={styles.miniTitle}>{maintitleLink? <Link href={maintitleLink} legacyBehavior>{maintitle}</Link> : maintitle}</li>}
        {lastTitle && <li className={styles.lastTitle}>{lastTitleLink? <Link href={lastTitleLink} legacyBehavior>{lastTitle}</Link> : lastTitle}</li>}
        {lastTitle2 && <li className={styles.lastTitle2}>{lastTitle2Link? <Link href={lastTitle2Link} legacyBehavior>{lastTitle2}</Link> : lastTitle2}</li>}
        {lastTitle3 && <li className={styles.lastTitle3}>{lastTitle3Link? <Link href={lastTitle3Link} legacyBehavior>{lastTitle3}</Link> : lastTitle3}</li>}
      </ul>
    </div>
    </div>
  );
}

export default RvBreadcrumbs;