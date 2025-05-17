import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono, Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable}  ${inter.variable} font-geist min-h-screen bg-default text-primary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col`}
      style={{
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}

export default MyApp;
