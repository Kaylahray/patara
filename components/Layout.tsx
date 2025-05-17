import { ReactNode, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, ChevronDown, Menu, Search, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isLoggedIn, logout, isLoading, login } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Show loading spinner while authentication is being checked
  if (isLoading || isConnecting) {
    return (
      <div className="min-h-screen bg-default flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  const handleConnectClick = () => {
    setIsConnecting(true);

    // Handle login directly if already on login page
    if (router.pathname === "/login") {
      // Login first, then navigate to dashboard after a slight delay
      login();
      setTimeout(() => {
        router.push("/");
        setTimeout(() => setIsConnecting(false), 300);
      }, 2000);
    } else {
      // If not on login page, just navigate to login
      setTimeout(() => {
        router.push("/login").then(() => {
          setIsConnecting(false);
        });
      }, 1500);
    }
  };

  return (
    <div className="lg:px-5 px-3 w-full overflow-hidden">
      {/* Header */}
      <header className="bg-default flex h-20 items-center justify-between p-2 mb-5 md:p-5">
        <div className="flex items-center gap-4 lg:min-w-[16.75rem]">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 p-2 flex items-center justify-center"
          >
            <Menu className="h-6 w-6 text-primary" />
          </Button>
          <Image src="/patara-logo.svg" alt="logo" width={134} height={36} />
        </div>

        <div className="relative hidden lg:flex lg:flex-1">
          <div
            ref={searchRef}
            className="relative flex w-full max-w-md mx-auto p-2 items-center rounded-xl border border-primary bg-secondary cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <Search className="h-5 w-5 text-secondary mr-2 p-0" />
            <div className="text-sm text-secondary flex-1">
              Enter Accounts, Platforms, NFTs, Token
            </div>
            <div className="p-2 text-xs text-secondary inline-flex justify-center items-center flex-shrink-0 rounded-lg bg-primary">
              ⌘K
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <IconButton className="flex bg-background-secondary hover:bg-background-secondary/80 size-8 sm:size-10">
            <Bell className="h-5 w-5 text-primary size-4 sm:size-5" />
          </IconButton>
          <IconButton className="flex bg-background-secondary hover:bg-background-secondary/80 size-8 sm:size-10">
            <Settings className="h-5 w-5 text-primary size-4 sm:size-5" />
          </IconButton>

          <div className="flex justify-end">
            {isLoggedIn ? (
              <DropdownMenu onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger className="bg-background-secondary hover:bg-background-secondary/80 h-10 flex cursor-pointer items-center gap-2 rounded-lg p-1 pr-2 focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0">
                  <Avatar className="rounded-none focus:outline-none focus-visible:outline-none focus:ring-0 focus:ring-offset-0">
                    <AvatarImage src="/user-profile.svg" />
                  </Avatar>

                  <span className="text-text-primary font-geist hidden text-sm font-semibold xl:block">
                    @patara.sui
                  </span>

                  <ChevronDown
                    className={`text-text-secondary ml-2.5 size-5 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={10}
                  className="bg-secondary border-primary border shadow-md focus-visible:outline-none focus:outline-none focus:border-transparent focus:ring-0 focus:ring-offset-0"
                >
                  <DropdownMenuItem className="text-primary min-w-full cursor-pointer hover:bg-primary hover:text-primary rounded-md px-2 py-1.5 my-0.5">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-primary min-w-full cursor-pointer hover:bg-primary hover:text-primary rounded-md px-2 py-1.5 my-0.5"
                    onClick={logout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="primary"
                onClick={handleConnectClick}
                className="h-10"
              >
                Connect/Sign in
              </Button>
            )}
          </div>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <DialogOverlay className="backdrop-blur-[1px] bg-black/80" />
          <DialogContent className="top-[140px] translate-y-0 p-0 bg-primary border-primary">
            <CommandInput
              placeholder="Enter Accounts, Platforms, NFTs, Token"
              className="border-none hover:border-none text-sm text-primary placeholder:text-secondary focus:ring-0 ring-0 focus:outline-none"
              autoFocus
            />
            <CommandList className="bg-secondary rounded-b-lg">
              <CommandEmpty className="text-secondary">
                No results found.
              </CommandEmpty>
              <CommandGroup className="p-2 text-primary" heading="Suggestions">
                <CommandItem className="rounded-md px-3 py-2 data-[selected=true]:bg-primary data-[selected=true]:text-primary hover:bg-primary hover:text-primary">
                  <Search className="mr-2 h-4 w-4 text-secondary" />
                  <span>Search NFTs</span>
                </CommandItem>
                <CommandItem className="rounded-md px-3 py-2 data-[selected=true]:bg-primary data-[selected=true]:text-primary hover:bg-primary hover:text-primary">
                  <Search className="mr-2 h-4 w-4 text-secondary" />
                  <span>Search Tokens</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </DialogContent>
        </CommandDialog>
      </header>

      {/* Main Content */}
      <main className="flex-grow no-scrollbar">{children}</main>
    </div>
  );
}

export default Layout;
