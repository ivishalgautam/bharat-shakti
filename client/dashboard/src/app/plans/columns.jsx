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
import { formatRupee } from "@/lib/format-rupee";
import { ArrowUpDown, Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";

export const columns = (openModal, setId, handleUpdate) => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "duration_in_months",
    header: ({ column }) => {
      return <Button variant="ghost">Duration In Months</Button>;
    },
    cell: ({ row }) => {
      const count = row.getValue("duration_in_months");
      return (
        <Badge variant="outline" className="capitalize">
          {count} Month
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <Button variant="ghost">PRICE</Button>;
    },
    cell: ({ row }) => {
      const price = row.getValue("price");
      return <Badge variant="outline">{formatRupee(price)}</Badge>;
    },
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return <Button variant="ghost">ACTIVE</Button>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      const isActive = row.getValue("is_active");
      return (
        <div className="flex items-center justify-start gap-2">
          <Switch
            checked={isActive}
            onCheckedChange={() => {
              setId(id);
              return handleUpdate({ is_active: !isActive });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "is_popular",
    header: ({ column }) => {
      return <Button variant="ghost">POPULAR</Button>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      const isPopular = row.getValue("is_popular");
      return (
        <div className="flex items-center justify-start gap-2">
          <Switch
            checked={isPopular}
            onCheckedChange={() => {
              setId(id);
              return handleUpdate({ is_popular: !isPopular });
            }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "features",
    header: ({ column }) => {
      return <Button variant="ghost">FEATURES</Button>;
    },
    cell: ({ row }) => {
      const features = row.getValue("features");

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              View Plan Features
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="border-b pb-2">
                <h3 className="font-medium text-lg">Your Plan Features</h3>
              </div>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    {feature.value && (
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm">{feature.key}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PopoverContent>
        </Popover>
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
              <Link href={`/plans/${id}/edit`} className="w-full">
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
