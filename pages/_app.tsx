import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Geist, Inter } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable}  ${inter.variable}  font-geist  bg-default text-primary shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col`}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
