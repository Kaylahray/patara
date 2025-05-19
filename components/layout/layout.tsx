import { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "../header-nav";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-default flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="lg:px-5 px-3 w-full min-h-screen overflow-hidden h-full">
      <Header />
      <main>{children}</main>
      <Toaster richColors />
    </div>
  );
}

export default Layout;
