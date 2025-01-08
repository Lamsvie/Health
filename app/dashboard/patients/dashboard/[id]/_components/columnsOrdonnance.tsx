"use client"

import { Button } from "@/components/ui/button"
import { Ordonnance } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { format, parse } from "date-fns"
import { ArrowUpDown, Edit, Eye, icons } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columnsOrd: ColumnDef<Ordonnance>[] = [

  {
    accessorKey: "ordonnance_Ref",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Reference
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "medecin_ref",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Medecin
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        
        const formatted = format(row.getValue("createdAt"), "dd/MM/yyyy")
   
        return <div className="text-center font-medium">{formatted}</div>
      },
  },
  {
    accessorKey: '_id',
    header: "Actions",
    cell: ({ row }) => {
        const userId = row.original._id
        
        return (
            <div className="flex gap-2">
                <Button size={"icon"}> <Link href={`/dashboard/patients/dashboard/ordonnance/${userId}`}><Edit size={16}/></Link> </Button>
                <Button variant={"destructive"} size={"icon"}> <Link href={`/dashboard/patients/dashboard/ordonnance/${userId}`}><Eye size={16}/></Link> </Button>
            </div>
        )
    }
  }
]
