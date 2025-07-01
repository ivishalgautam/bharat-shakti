"use client";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { ArrowUpDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { rupee } from "@/lib/Intl";

export const columns = (setUserId, openModal) => [
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-24"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        UNIT <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "bid_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-32"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        GEM Order No <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-28"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DATE <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    accessorKey: "items",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-20"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ITEM <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const items = row.getValue("items");
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {items.length > 10
                ? String(items).substring(0, 10) + "..."
                : items}
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-72">{items}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "invoice_no",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-32"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invoice No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "invoice_quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Invoice Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "delivery_date_without_ld",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Delivery Date (Without LD) <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "delivery_date_with_ld",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Delivery Date (With LD) <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "supplied_quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Supplied Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "rejected_quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rejected Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "accepted_quantity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Accepted Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "supplied_value_basic",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Supplied Value Basic <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("supplied_value_basic");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "supplied_value_gst",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-40"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Supplied Value GST <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("supplied_value_gst");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "accepted_value_basic",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Accepted Value Basic <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("accepted_value_basic");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "accepted_value_gst",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Accepted Value GST <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("accepted_value_gst");
      return rupee.format(value);
    },
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
    accessorKey: "ld_deduction",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-36"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        LD Deduction <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("ld_deduction");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "gst_tds",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-32"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        GST TDS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("gst_tds");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "it_tds",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-32"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        IT TDS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("it_tds");
      return rupee.format(value);
    },
  },
  {
    accessorKey: "payment_dues",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-36"
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
    accessorKey: "payment_date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-36"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment Date <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "days",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-24"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DAYS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="w-32"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{moment(row.getValue("created_at")).format("DD/MM/YYYY")}</div>
    ),
  },
];
