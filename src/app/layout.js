import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default:"Trendzipper",
    template:"%s | Trendzipper"
  },
  description: "Welcome to Trendzipper. we don't just market brands, we bring it to life",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ClientSideProviderTest> */}
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        {/* </ClientSideProviderTest> */}
      </body>
    </html>
  );
}
