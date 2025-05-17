"use client";

import { useState, ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "../../lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type TimeFilter = "1D" | "1W" | "1M" | "1Y" | "ALL";

interface Transaction {
  id: string;
  account: string;
  amountIn: { value: number; currency: string };
  amountOut: { value: number; currency: string };
  price: number;
  value: number;
  earnedFee: number;
  time: string;
}

type CellConfig = {
  header: string;
  render: (transaction: Transaction) => ReactNode;
  cellClassName?: string;
};

// Dropdown component for the table footer
function EarningsTableDropdown({
  count,
  setCount,
}: {
  count: number;
  setCount: (count: number) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-background-secondary hover:bg-background-secondary/80 border-primary flex h-10 cursor-pointer items-center gap-1 rounded-lg border p-2">
        <span className="text-primary font-geist text-sm font-semibold">
          {count} <span className="hidden md:inline"> Transaction</span>
        </span>
        <ChevronDown className="text-secondary size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-secondary border-primary border shadow-md min-w-[140px]">
        {[10, 20, 30, 40, 50].map((value) => (
          <DropdownMenuItem
            key={value}
            className="text-primary cursor-pointer hover:bg-primary hover:text-primary rounded-md px-2 py-1.5 my-0.5"
            onClick={() => setCount(value)}
          >
            {value} <span> Transaction</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Pagination component for the table footer
function EarningsTablePagination({
  currentPage,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  // Helper function to determine which pages to show
  const getVisiblePages = () => {
    // If current page is in middle group, show it
    if (currentPage >= 4 && currentPage <= 6) {
      return {
        showFirstGroup: true,
        showMiddleGroup: true,
        showLastGroup: true,
      };
    }

    // Otherwise just show first and last groups
    return {
      showFirstGroup: true,
      showMiddleGroup: false,
      showLastGroup: true,
    };
  };

  const { showFirstGroup, showMiddleGroup, showLastGroup } = getVisiblePages();

  return (
    <Pagination className="m-0 hidden max-w-[21.25rem] md:block">
      <PaginationContent>
        {/* First group (1,2,3) */}
        {showFirstGroup &&
          [1, 2, 3].map((pageNum) => (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                isActive={currentPage === pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className="hover:bg-secondary"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis between first and middle group */}
        {showMiddleGroup && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Middle group (4,5,6) */}
        {showMiddleGroup &&
          [4, 5, 6].map((pageNum) => (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                isActive={currentPage === pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className="hover:bg-secondary"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Ellipsis between middle and last group */}
        {showFirstGroup && showLastGroup && !showMiddleGroup && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last group (7,8,9) */}
        {showLastGroup &&
          [7, 8, 9].map((pageNum) => (
            <PaginationItem key={`page-${pageNum}`}>
              <PaginationLink
                isActive={currentPage === pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className="hover:bg-secondary"
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          ))}
      </PaginationContent>
    </Pagination>
  );
}

// Navigation buttons component for the table footer
function EarningsTableButtons({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        className="size-10 bg-primary border-primary text-primary hover:bg-secondary"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="size-10 bg-primary border-primary text-primary hover:bg-secondary"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Footer component that combines all three components
function EarningsTableFooter({
  currentPage,
  totalPages,
  setCurrentPage,
  transactionsPerPage,
  setTransactionsPerPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  transactionsPerPage: number;
  setTransactionsPerPage: (count: number) => void;
}) {
  return (
    <footer className="bg-primary flex justify-between items-center rounded-b-2xl p-4 mt-4">
      <EarningsTableDropdown
        count={transactionsPerPage}
        setCount={setTransactionsPerPage}
      />
      <EarningsTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <EarningsTableButtons
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </footer>
  );
}

export default function EarningsTable() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("1W");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const totalPages = 9;

  // Reusable text styles
  const textBaseStyle = "font-geist text-sm font-medium leading-[18px]";
  const textPrimaryStyle = cn(textBaseStyle, "text-primary");
  const textSecondaryStyle = cn(textBaseStyle, "text-secondary");

  // Column configurations
  const columns: CellConfig[] = [
    {
      header: "ACCOUNT",
      cellClassName: "rounded-l-2xl",
      render: (tx) => (
        <div className="flex items-center gap-2">
          <div className="md:w-10 w-8 md:h-10 h-8 flex items-center justify-center">
            <Avatar className="h-full w-full">
              <AvatarImage src="/user-profile.svg" alt="User" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </div>
          <span className={textPrimaryStyle}>{tx.account}</span>
        </div>
      ),
    },
    {
      header: "AMOUNT IN",
      render: (tx) => (
        <div className={textPrimaryStyle}>
          {tx.amountIn.value.toLocaleString()}{" "}
          <span className={textSecondaryStyle}>{tx.amountIn.currency}</span>
        </div>
      ),
    },
    {
      header: "AMOUNT OUT",
      render: (tx) => (
        <div className={textPrimaryStyle}>
          {tx.amountOut.value.toLocaleString()}{" "}
          <span className={textSecondaryStyle}>{tx.amountOut.currency}</span>
        </div>
      ),
    },
    {
      header: "PRICE",
      render: (tx) => (
        <div className={textPrimaryStyle}>${tx.price.toFixed(2)}</div>
      ),
    },
    {
      header: "VALUE",
      render: (tx) => (
        <div className={textPrimaryStyle}>${tx.value.toLocaleString()}</div>
      ),
    },
    {
      header: "EARNED FEE",
      render: (tx) => (
        <div className={textPrimaryStyle}>${tx.earnedFee.toFixed(2)}</div>
      ),
    },
    {
      header: "TIME",
      cellClassName: "rounded-r-2xl",
      render: (tx) => <div className={textPrimaryStyle}>{tx.time}</div>,
    },
  ];

  // Mock data
  const transactions: Transaction[] = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `tx-${i}`,
      account: "0x1f20e...e2026",
      amountIn: { value: 1000, currency: "SUI" },
      amountOut: { value: 2500, currency: "USDC" },
      price: 2.5,
      value: 2500,
      earnedFee: 0.05,
      time: "1 day ago",
    }));

  return (
    <div className="bg-default rounded-xl py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-primary font-geist text-2xl font-medium leading-[28px]">
          Earnings
        </h2>
        <div className="flex items-center bg-primary rounded-xl p-1 gap-1">
          {(["1D", "1W", "1M", "1Y", "ALL"] as TimeFilter[]).map((filter) => (
            <button
              key={filter}
              className={`px-3 py-1 font-geist text-sm font-medium leading-[18px] text-center ${
                timeFilter === filter
                  ? "bg-secondary rounded-lg text-primary"
                  : "text-[#585858]"
              }`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar rounded-t-[24px] bg-primary px-4 py-4">
        <Table className="border-spacing-y-2 border-separate w-full">
          <TableHeader>
            <TableRow className="border-none hover:bg-transparent">
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className="text-secondary font-geist text-xs font-medium leading-4 py-4 pl-3.5"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow
                key={tx.id}
                className="rounded-2xl bg-secondary hover:bg-[#323232] border-none"
                style={{ height: "72px" }}
              >
                {columns.map((column, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={cn("px-4 py-4", column.cellClassName)}
                  >
                    {column.render(tx)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Use the new table footer */}
        <EarningsTableFooter
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          transactionsPerPage={transactionsPerPage}
          setTransactionsPerPage={setTransactionsPerPage}
        />
      </div>
    </div>
  );
}
