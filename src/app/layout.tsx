import type { Metadata } from "next";
import { Inter, Poppins, Geist } from "next/font/google";
import "./globals.css";
import CornerNav from "@/components/CornerNav";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ADRIG AI Technologies",
    template: "%s · ADRIG AI Technologies",
  },
  description:
    "ADRIG builds AI, automation, software and data systems for businesses that want to evolve.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable, "font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <CornerNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

