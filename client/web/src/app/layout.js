import localFont from "next/font/local";
import "./globals.css";
import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";
import SessionWrapper from "@/components/providers/session-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: {
    default:
      "BharatShaktiTenders.com – India’s #1 Portal for Government & PSU Tenders",
    template: "%s | Bharat Shakti",
  },
  description:
    "Discover the latest 2025 government tenders from Central & State departments across India. Bid online for GeM, PSU, infrastructure, and defense projects. Get free tender alerts via SMS & Email. Stay ahead with real-time updates and seamless e-bidding on BharatShaktiTenders.com – your trusted gateway to public procurement opportunities.",
  keywords:
    "government tenders 2025, Indian tenders, e tender India, GeM tenders, PSU tenders, infrastructure tenders, state government tenders, central government tenders, online tender bidding, Bharat Shakti Tenders, tender alerts India, free tender updates, public procurement India",
  openGraph: {
    title: "Latest Indian Government Tenders 2025 | BharatShaktiTenders.com",
    description:
      "Access the latest 2025 tenders from Central & State Governments, PSUs, GeM, and infrastructure projects. Register on BharatShaktiTenders.com to get free SMS/Email alerts and bid online with ease.",
    images:
      "https://bharatshaktitenders.com/_next/image?url=%2Flogo.jpg&w=384&q=75",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <Layout>{children}</Layout>
          <Toaster />
        </body>
      </html>
    </SessionWrapper>
  );
}
