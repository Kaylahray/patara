import BackgroundLetters from "@/components/background-letters";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import OrbitAvatars from "@/components/orbit-avatars";

export default function Login() {
  const { login, isLoading, isConnecting } = useAuth();

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-default flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-auto max-w-screen-xl mx-auto">
      <div className="absolute inset-0 z-0 md:blur-[4px]">
        <BackgroundLetters />
      </div>

      {/* Main Content */}
      <main className="relative flex justify-center z-10 items-center mt-8">
        <div className="bg-primary border-default border rounded-3xl  py-10 md:px-5 px-3 w-auto max-w-[464px] md:w-full mx-auto flex flex-col items-center">
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
            onClick={login}
            className="h-10"
            disabled={isConnecting || isLoading}
          >
            Connect/Sign in
          </Button>
        </div>
      </main>
    </div>
  );
}
