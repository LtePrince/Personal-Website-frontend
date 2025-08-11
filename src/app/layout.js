import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import "@/styles/components/index.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Whalefall's Blog",
    template: "%s | Whalefall's Blog",
  },
  description: "Personal blog of Whalefall: posts, interests and projects.",
  openGraph: {
    type: "website",
    siteName: "Whalefall's Blog",
    url: "/",
    title: "Whalefall's Blog",
    description: "Personal blog of Whalefall: posts, interests and projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whalefall's Blog",
    description: "Personal blog of Whalefall: posts, interests and projects.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${ovo.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
