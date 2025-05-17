"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  ReferralIcon,
  TotalEarnedIcon,
  TotalRefPointsIcon,
  UnclaimedFeeIcon,
} from "../ui/icons/icon";

interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

function StatsCard({
  icon,
  label,
  value,
  actionButton,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "border-none w-full p-0 rounded-2xl bg-primary h-full",
        className
      )}
    >
      <CardContent className="flex items-center justify-between p-4 pt-4 pb-4.5 h-full">
        <div className="flex items-center gap-4">
          <div className="flex p-2 items-center justify-center rounded-md bg-secondary">
            <div>{icon}</div>
          </div>
          <div className="flex flex-col">
            <CardDescription className="text-secondary mb-2 font-geist text-sm font-normal leading-[18px]">
              {label}
            </CardDescription>
            <p className="text-primary font-geist text-2xl font-medium leading-[28px]">
              {value}
            </p>
          </div>
        </div>
        {actionButton && (
          <CardFooter className="p-0 my-auto">
            <Button variant="primary" onClick={actionButton.onClick}>
              {actionButton.label}
            </Button>
          </CardFooter>
        )}
      </CardContent>
    </Card>
  );
}

const StatsCards = () => {
  const handleClaim = () => {
    console.log("Claiming fee...");
  };

  return (
    <div className="w-full grid mt-5 xl:mt-0 grid-cols-1 md:grid-cols-2 xl:grid-cols-1 xl:max-w-md gap-4 md:gap-5">
      <StatsCard
        icon={<TotalEarnedIcon />}
        label="Total Earned Fee"
        value="$1,000.00"
      />

      <StatsCard
        icon={<UnclaimedFeeIcon />}
        label="Unclaimed Fee"
        value="$500.00"
        actionButton={{
          label: "Claim",
          onClick: handleClaim,
        }}
      />

      <StatsCard
        icon={<TotalRefPointsIcon />}
        label="Total Referral Points"
        value={1289}
      />

      <StatsCard icon={<ReferralIcon />} label="Referrals" value={34} />
    </div>
  );
};

export default StatsCards;
