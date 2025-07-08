
import AboutUs from "@/components/landing/about-us/aboutus";

import Tickers from "@/components/landing/tickers/tickers";

import WhyChouseUs from "@/components/landing/why-chouse-us/whychouseus";

import { Testimonials } from "@/components/landing/testimonials/testimonials";
import TopFeatures from "@/components/landing/features/topfeatures";
import OurServices from "@/components/landing/services/ourservice";
import { OurPosts } from "@/components/landing/our-blogs/ourposts";
import FaqSection from "@/components/landing/faq/faqsection";
import FactsSection from "@/components/landing/facts/facts";
import WhatWeDo from "@/components/landing/what-we-do/whatwedo";
import HowWork from "@/components/landing/how-work/howwork";

import {getSiteData} from "@/lib/functions";
import HeroSection from "@/components/landing/hero-section/heroSection";





export default async function Page({ children }) {

    const siteData = await getSiteData();
    return (
        <div className="bg-slate-50 flex flex-col">
            <main>

                <Tickers />


                <HeroSection siteData={siteData} />
                <AboutUs />
                <OurServices />
                <WhyChouseUs />
                <TopFeatures />
                <FactsSection />
                <WhatWeDo />
                <HowWork />
                <FaqSection />
                <Testimonials />
                <OurPosts />
            </main>
        </div>
    );
}