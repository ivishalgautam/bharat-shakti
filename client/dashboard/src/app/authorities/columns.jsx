"use client";
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
import Link from "next/link";
import TableImage from "@/components/ui/table-image";
import { Switch } from "@/components/ui/switch";

export const columns = (openModal, setId, handleUpdate) => [
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
    accessorKey: "is_featured",
    header: ({ column }) => {
      return <Button variant="ghost">FEATURED</Button>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      const featured = row.getValue("is_featured");
      return (
        <div className="flex items-center justify-start gap-2">
          <Switch
            checked={featured}
            onCheckedChange={() => {
              setId(id);
              return handleUpdate({ is_featured: !featured });
            }}
          />
        </div>
      );
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
              <Link href={`/authorities/${id}/edit`} className="w-full">
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
