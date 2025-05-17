"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import ReferralCard from "@/components/dashboard/referral-card";
import StatsCards from "@/components/dashboard/stats-cards";
import EarningsTable from "@/components/dashboard/earnings-table";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/Layout/layout";
export default function Dashboard() {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <Layout>
      <div className="grid grid-cols-1 w-full lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 no-scrollbar overflow-auto">
        <div className="lg:col-span-3 col-span-1  h-full w-full">
          <ReferralCard />
        </div>

        <div className="xl:col-span-1 col-span-3 h-full">
          <StatsCards />
        </div>
      </div>
      <div className="mt-4">
        <EarningsTable />
      </div>
    </Layout>
  );
}
