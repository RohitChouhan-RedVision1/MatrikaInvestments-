import { Montserrat } from "next/font/google";
import "./globals.css";
import RenewalPopup from "@/components/renewalPopup";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getSiteData } from "@/lib/functions";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata() {
   const siteData = await getSiteData();
  return {
    title: {
      default: siteData.websiteName,
      template: `%s - ${siteData.websiteName}`,
    },
    description:
    siteData.websiteName,
    openGraph: {
      title: siteData.websiteName,
      description: siteData.websiteName,
      type: "website",
      locale: "en_IN",
      siteName: siteData.websiteName,
      url: `http://${siteData.websiteName}` ,
      // images: ["https://100takka.com/og.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: siteData.websiteName,
      description: siteData.websiteName,
    },
    authors: [siteData.websiteName],
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${montserrat.variable}`}>
        <SubscriptionProvider>
          <SpeedInsights />
          <RenewalPopup />
          <div className="bg-white">
            {children}
          </div>
        </SubscriptionProvider>
      </body>
    </html>
  );
}
