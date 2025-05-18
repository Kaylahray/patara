import ReferralCard from "@/components/dashboard/referral-card";
import StatsCards from "@/components/dashboard/stats-cards";
import EarningsTable from "@/components/dashboard/earnings-table";

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 w-full lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 ">
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
    </>
  );
}
