"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackgroundLetters from "@/components/background-letters";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import OrbitAvatars from "@/components/orbit-avatars";

export default function Login() {
  const { login, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Only redirect if fully logged in and not in the process of connecting
    if (!isLoading && isLoggedIn && !isConnecting) {
      // Add a small delay to ensure smooth transition
      setTimeout(() => {
        router.replace("/");
      }, 300);
    }
  }, [isLoggedIn, isLoading, router, isConnecting]);

  const handleLogin = () => {
    setIsConnecting(true);
    login();

    // Add a delay to ensure the login state is fully processed before redirecting
    setTimeout(() => {
      router.push("/");
      // Keep connecting state for a bit after navigation to prevent flashes
      setTimeout(() => {
        setIsConnecting(false);
      }, 500);
    }, 1500);
  };

  // Show loading spinner while connecting
  if (isConnecting) {
    return (
      <div className="min-h-screen bg-default flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-[calc(100vh-120px)] overflow-hidden max-w-screen-xl mx-auto">
        {/* Blurred Background */}
        <div className="absolute inset-0 z-0 blur-[4px]">
          <BackgroundLetters />
        </div>

        {/* Main Content */}
        <main className="relative flex justify-center z-10 items-center mt-8">
          <div className="bg-primary border-default border rounded-3xl py-10 px-5 max-w-[464px] w-full mx-auto flex flex-col items-center">
            <div className="relative w-80 h-80 mb-8">
              <OrbitAvatars />
            </div>

            <h1 className="text-primary font-geist text-[24px] font-medium leading-[28px] text-center mb-6">
              Refer friends and earn with Patara!
            </h1>

            <p className="text-secondary font-geist text-[16px] font-normal leading-[22px] text-center mb-10 max-w-sm">
              Invite your friends to Patara and earn a share of their on-chain
              rewards forever!
            </p>

            <Button
              variant="primary"
              onClick={handleLogin}
              className="h-10"
              disabled={isConnecting || isLoading}
            >
              Connect/Sign in
            </Button>
          </div>
        </main>
      </div>
    </Layout>
  );
}
