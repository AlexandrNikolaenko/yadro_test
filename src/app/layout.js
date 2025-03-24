import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { APP_HOST } from "./components/host";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "Test app to Yadro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased pt-12 flex flex-col items-center`}
      >
        <Link href={`${APP_HOST}/`} className="py-3 px-5 rounded-full shadow-md text-base border-gray-200 border-2">На главную</Link>
        {children}
      </body>
    </html>
  );
}
