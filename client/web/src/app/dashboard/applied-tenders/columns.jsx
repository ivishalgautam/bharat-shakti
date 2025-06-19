"use client";
import { Button } from "@/components/ui/button";
import moment from "moment";

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
