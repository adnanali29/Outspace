import type { Metadata } from "next";
import { Maven_Pro, Poppins } from "next/font/google";
import "./globals.css";

// The same two typefaces as outpaceacademy.com.
const maven = Maven_Pro({
  variable: "--font-maven",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Outpace Academy | Live Online Chess Classes for Ages 5–13",
  description:
    "Every child can learn. We find the way. Chess taught by patient coaches, with a mentor who truly gets to know your child. Book a free first session.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${maven.variable} ${poppins.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
