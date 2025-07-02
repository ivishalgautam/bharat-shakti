"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown, Eye } from "lucide-react";
import { rupee } from "@/lib/Intl";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = () => [
  {
    accessorKey: "bid_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        GEM Order No <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const id = row.original.application_id;
      return (
        <Link href={`/dashboard/order-follow-up/view/${id}`}>
          <Badge>{row.getValue("bid_number")}</Badge>
        </Link>
      );
    },
  },

  {
    accessorKey: "internal_order_no",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Internal Order No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "payment_received",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment Received <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("payment_received");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "payment_dues",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment Dues <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("payment_dues");
      return rupee.format(value);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.application_id;
      return (
        <Link
          href={`/dashboard/order-follow-up/view/${id}`}
          className={cn("w-full", buttonVariants({}))}
        >
          <Eye />
          View
        </Link>
      );
    },
  },
];
