"use client";
import { Switch } from "@/components/ui/switch";
import { Small } from "@/components/ui/typography";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import moment from "moment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export const columns = (
  updateMutation,
  setUserId,
  openModal,
  setApplicationId
) => [
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
    accessorKey: "fullname",
    header: "FULLNAME",
    cell: ({ row }) => {
      const fullname = row.getValue("fullname");
      return <div className="capitalize">{fullname}</div>;
    },
  },
  {
    accessorKey: "username",
    header: "USERNAME",
    cell: ({ row }) => {
      const username = row.getValue("username");
      return (
        <div className="flex items-center justify-start gap-2">
          <Badge variant={"outline"}>@{username}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "mobile_number",
    header: "PHONE",
  },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Select
          defaultValue={row.getValue("status")}
          onValueChange={(value) => {
            setApplicationId(id);
            updateMutation.mutate({ status: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Initiated">Initiated</SelectItem>
            <SelectItem value="Order Received">Order Received</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      );
    },
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
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const id = row.original.id;
  //     const role = row.original.role;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Link
  //               href={
  //                 role === "user"
  //                   ? `/users/view/${id}/user`
  //                   : role === "subAdmin"
  //                     ? `/users/view/${id}/sub-admin`
  //                     : "#"
  //               }
  //             >
  //               View
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem
  //             onClick={() => {
  //               setUserId(id);
  //               openModal();
  //             }}
  //           >
  //             Delete
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
