import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Search, User, LogOut } from "lucide-react";
import { NotificationBellIcon, SettingsIcon } from "@/components/ui/icons/icon";
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
import { DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { IconButton } from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { handleLogin, isLoggedIn, isLoading, logout, isConnecting } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn && !isConnecting) {
      router.replace("/");
    }
  }, [isLoggedIn, isLoading, router, isConnecting]);

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

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-default flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <>
      <header className="bg-default flex  items-center gap-10 justify-between p-2 mb-5 md:p-5">
        <div className="flex items-center gap-4 lg:min-w-[16rem]">
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
            <NotificationBellIcon className="h-5 w-5 text-primary size-4 sm:size-5" />
          </IconButton>
          <IconButton className="flex bg-background-secondary hover:bg-background-secondary/80 size-8 sm:size-10">
            <SettingsIcon className="h-5 w-5 text-primary size-4 sm:size-5" />
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
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-primary min-w-full cursor-pointer hover:bg-primary hover:text-primary rounded-md px-2 py-1.5 my-0.5"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="primary"
                onClick={handleLogin}
                className="h-10"
                disabled={isLoading}
              >
                {isLoading ? "Connecting..." : "Connect/Sign in"}
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
            <CommandList className="bg-primary text-primary rounded-b-lg mt-0 pt-0">
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
    </>
  );
}

export default Header;
