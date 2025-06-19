import Layout from "@/components/layout";
import SessionWrapper from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
// const articular = localFont({
//   src: [
//     {
//       path: "../../public/fonts/articulat-400.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/articulat-400-italic.otf",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "../../public/fonts/articulat-700.otf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "../../public/fonts/articulat-700-italic.otf",
//       weight: "700",
//       style: "italic",
//     },
//   ],
//   variable: "--font-articular",
// });

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
    images: "http://localhost:4000/_next/image?url=%2Flogo.png&w=1080&q=100",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
          suppressHydrationWarning={true}
        >
          <Layout>{children}</Layout>
          <Toaster />
        </body>
      </html>
    </SessionWrapper>
  );
}
