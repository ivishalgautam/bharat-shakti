"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpDown, Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const columns = () => [
  {
    accessorKey: "bid_number",
    header: ({ column }) => {
      return <Button variant="ghost">GEM Order Number</Button>;
    },
  },
  {
    accessorKey: "item_gem_arpts",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ITEMS <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const items = row.getValue("item_gem_arpts");
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
    accessorKey: "status",
    header: "STATUS",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <Button variant="ghost">APPLIED ON</Button>;
    },
    cell: ({ row }) => {
      return (
        <div>{moment(row.getValue("created_at")).format("DD/MM/YYYY")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link
          className={buttonVariants()}
          href={`/dashboard/invoice-master/create?aid=${id}`}
        >
          <Plus /> Add to invoice master
        </Link>
      );
    },
  },
];
