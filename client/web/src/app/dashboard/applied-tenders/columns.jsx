"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const columns = (setUserId, openModal) => [
  {
    accessorKey: "application_id",
    header: "Application ID",
  },
  {
    accessorKey: "bid_number",
    header: ({ column }) => {
      return <Button variant="ghost">Bid Number</Button>;
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
          <Plus /> Add Invoice
        </Link>
      );
    },
  },
];
