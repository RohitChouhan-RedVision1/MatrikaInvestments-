"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Banner from "@/components/section-banner/banner";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

const UsefulLinksPage = () => {
  const [usefulLink, setUsefulLink] = useState([]);
  const fetchLinks = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (res.ok) {
      const data = await res.json();
      setUsefulLink(data);
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="">
      <RvBreadcrumbs
        maintitle="Useful Links"
      />
      {/* <Banner title={"Useful Links"} /> */}
      <div className="py-[100px]">
        <div className="container mx-auto md:px-20 px-4 pt-5 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {usefulLink.map((link, index) => (
              <Link href={link.link} key={index} legacyBehavior>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[var(--rv-secondary)] text-white border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition hover:bg-[var(--rv-primary)] hover:text-white duration-300 flex flex-col justify-center items-center"
                >
                  <h3 className="text-xl font-semibold">{link.title}</h3>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsefulLinksPage;
