"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { toolsdata } from "@/data/commanData";
import { servicesdata } from "@/data/commanData";
const Navbar = ({ services }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // console.log(toolsdata);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showServices, setShowServices] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const toggleServices = () => {
    setShowServices((prev) => !prev);
  };
  const toggletools = () => {
    setShowTools((prev) => !prev);
  };

  return (
    <nav className={`${styles.rvNav}`}>
      <div className="container ">
        <div className={`${styles.rvhFlex}`}>
          <Link className={`${styles.sitelogo}`} href="/">
            
            <Image src="/logo.webp" alt="Logo" width={1200} height={100} />
          </Link>
          <div className={`${styles.mainMenu}`} id="navbar-dropdown">
            <div className={`${styles.navMenuWrapper}`}>
              <ul className="">
                <li>
                  <Link className="" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="" href="/about-us">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="" href="#">
                    Services <FaChevronDown className="" />
                  </Link>
                  <ul>
                  {servicesdata?.map((servicesditems, index) => (

                  <li key={index + 1}>
                    <Link href={`/services/${servicesditems?.slugUrl}`} className="" >
                      {servicesditems?.title}
                    </Link>
                  </li>
                  ))}
                  </ul>
                </li>
                <li>
                  <Link className="" href="#">
                    Tools <FaChevronDown className="" />
                  </Link>
                  <ul>
                    {toolsdata?.map((toolsitems, index) => (

                      <li key={index + 1}>
                        <Link href={`${toolsitems?.link}`} className="" >
                          {toolsitems?.name}
                        </Link>
                      </li>
                    ))}

                  </ul>
                </li>
                <li>
                  <Link className="nav-link" href="/blogs">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/contact-us">
                    Contact us
                  </Link>
                </li>
                <div className="">
                  <Link
                    href="/login"
                    className="btn btn-primary"
                  >
                    Login
                  </Link>
                </div>
              </ul>
            </div>
            <div className={`${styles.rvmmBtn}`}>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="btn btn-primary"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>
        {isMobileMenuOpen && (
          <div className={`${styles.rvmobilemenu} ${isMobileMenuOpen ? `${styles.mobileActive}` : ''}`}>
            <div className={`${styles.rvmobilemenuheader}`}>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <svg
                  className="w-6 h-6 text-[var(--rv-third)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className={`${styles.rvmmhnav}`}>
              <ul>
                <li><Link className="" href="/">Home</Link></li>
                <li><Link className="" href="/about-us">About Us</Link></li>
                {/* <li > About Us </li>
                  
                  {showAbout && (
                  <div className="flex flex-col space-y-4 text-sm text-[var(--rv-third)] ">
                    <Link className="hover:text-[var(--rv-secondary)]" href="/about-us">
                      About Us
                    </Link>
                  </div>
                )}

                 */}
                <li onClick={toggleServices} className={`${showServices ? `${styles.active}` : ''}`}> Services <FaChevronDown className="" /> </li>

                {/* Dropdown content */}
              {showServices && (
                  <ul >
                       {servicesdata?.map((servicesditems, index) => (
                <li  key={index + 1}>
                      <Link
                        className=""
                        key={index}
                        href={`/services/${servicesditems?.slugUrl}`}
                      >
                        {servicesditems?.title}
                      </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <li onClick={toggletools} className={`${showTools ? `${styles.active}` : ''}`} > Tools <FaChevronDown className="" /> </li>

                {/* Dropdown content */}
                {showTools && (
                  <ul className="">
                    {toolsdata?.map((toolsitems, index) => (

                      <li key={index + 1}>
                        <Link href={`${toolsitems?.link}`} className="" >
                          {toolsitems?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <li> <Link className="" href="/blogs"> Blogs </Link> </li>
                <li> <Link className="" href="/contact-us" > Contact Us </Link> </li>
                <li><Link className="" href="/login">Login </Link></li>
              </ul>

            </nav>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
