"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import moment from "moment";
import { ArrowUpDown, Eye } from "lucide-react";
import { rupee } from "@/lib/Intl";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns = () => [
  {
    accessorKey: "invoice_no",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invoice No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
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
      const id = row.original.id;
      return (
        <Link href={`/dashboard/invoice-master/view/${id}`}>
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
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{moment(row.getValue("created_at")).format("DD/MM/YYYY")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          href={`/dashboard/invoice-master/view/${id}`}
          className={cn("w-full", buttonVariants({}))}
        >
          <Eye /> View
        </Link>
      );
    },
  },
];
