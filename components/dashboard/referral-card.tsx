"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import OrbitAvatars from "../orbit-avatars";
import { toast } from "sonner";

export default function ReferralCard() {
  const [referralLink] = useState("0x0e0Fceb520F76f3eAC0Aa764De4B97C53Eb36658");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Link copied to clipboard!");
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Join Patara with my referral link",
          text: "Use my referral link to join Patara and we both earn rewards!",
          url: `https://patara.io/ref/${referralLink}`,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="rounded-3xl bg-primary p-6 lg:py-10 lg:pl-10 lg:pr-20 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end bg lg:items-start">
        <div className="mb-6 md:mb-0 md:w-[30rem]">
          <h1 className="font-geist text-[32px] mb-6 font-medium leading-[32px] text-primary tracking-[-1.6px]">
            Refer and Earn
          </h1>
          <p className="font-geist text-[16px] font-normal leading-[22px] text-secondary lg:max-w-[74%]">
            Invite your friends to Patara and earn a share of their on-chain
            rewards forever!
          </p>

          <div className="md:mt-19 mt-10">
            <div className="flex flex-col w-full p-6 pl-4 pr-4 lg:pr-6 rounded-xl bg-secondary">
              <p className="font-geist text-[14px] font-normal leading-[18px] text-secondary">
                Your Referral Link
              </p>
              <Input
                className="font-geist text-[16px] p-0 font-medium leading-[18px] text-primary border-none outline-none focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 bg-transparent"
                value={referralLink}
                readOnly
              />
            </div>
            <div className="flex gap-2 mt-5">
              <Button
                variant="primary"
                onClick={copyToClipboard}
                className="flex-1"
              >
                Copy Link
              </Button>
              <Button
                variant="tertiary"
                className="flex-1 gap-2 items-center "
                onClick={shareLink}
              >
                <Image src="/share.svg" alt="Share" width={24} height={24} />
                <span className="font-geist text-[14px] font-medium leading-[18px] text-secondary text-center">
                  Share
                </span>
              </Button>
            </div>
          </div>
        </div>

        <OrbitAvatars />
      </div>
    </div>
  );
}
