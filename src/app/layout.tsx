import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Reda | Lead Big Data & Distributed Systems Engineer",
  description:
    "Engineering portfolio of Mohamed Reda. Architecting petabyte streaming pipelines, cloud lakehouses, and distributed data systems with Apache Kafka, Spark, Flink, and Delta Lake.",
  keywords: [
    "Big Data Engineer",
    "Distributed Systems",
    "Apache Kafka",
    "Apache Spark",
    "Apache Flink",
    "Delta Lake",
    "Data Lakehouse",
    "Real-time Streaming",
    "Mohamed Reda",
  ],
  authors: [{ name: "Mohamed Reda" }],
  openGraph: {
    title: "Mohamed Reda | Lead Big Data & Distributed Systems Engineer",
    description:
      "Architecting petabyte streaming pipelines, cloud lakehouses, and distributed data systems with zero-loss guarantees.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfbfa] text-[#37352f] font-sans antialiased selection:bg-[#faebdd] selection:text-[#d9730d]">
        {children}
      </body>
    </html>
  );
}
