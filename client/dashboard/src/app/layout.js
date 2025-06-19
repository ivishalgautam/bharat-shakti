import Layout from "@/components/layout";
import ThemeProvider from "@/providers/theme-provider";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const InstrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrumental-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Dashboard",
    template: "%s | Bharat Shakti",
  },
  description: "Bharat Shakti Dashboard",
  openGraph: {
    images:
      "https://bharatshaktitenders.com/_next/image?url=%2Flogo.png&w=1080&q=100",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${InstrumentSans.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
