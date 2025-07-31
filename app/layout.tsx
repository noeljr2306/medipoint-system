import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Changed import to Poppins
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Optional: specify weights as needed
});

export const metadata: Metadata = {
  title: "MediPoint",
  description: "Patient Appointment Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`} // Use Poppins variable
      >
        {children}
      </body>
    </html>
  );
}
