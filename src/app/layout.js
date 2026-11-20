import { Fraunces, Outfit } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  metadataBase: new URL("https://constructions.homes"),
  title: {
    default: "Constructions.homes",
    template: "%s · Constructions.homes",
  },
  description:
    "Independent, practical guidance for people building an independent house in India. We don't build your house. We help you understand how your house should be built.",
  applicationName: "Constructions.homes",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Constructions.homes",
    title: "Constructions.homes",
    description:
      "Independent, practical guidance for people building an independent house in India.",
  },
};

export const viewport = {
  themeColor: "#12110f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans text-cream">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
