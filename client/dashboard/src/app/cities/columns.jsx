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
import TableImage from "@/components/ui/table-image";

export const columns = (openModal, setId) => [
  {
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ row }) => {
      const image = row.getValue("image");
      return <TableImage src={image} />;
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return (
        <div className="flex items-center justify-start gap-2">
          <Badge variant={"outline"}>{name}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "tenders_count",
    header: ({ column }) => {
      return <Button variant="ghost">TENDERS</Button>;
    },
    cell: ({ row }) => {
      const count = row.getValue("tenders_count");
      return <Badge>{count}</Badge>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <Button variant="ghost">CREATED ON</Button>;
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
      const role = row.original.role;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/cities/${id}/edit`} className="w-full">
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setId(id);
                openModal();
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
