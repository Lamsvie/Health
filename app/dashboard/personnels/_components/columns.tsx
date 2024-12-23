"use client"

import { Button } from "@/components/ui/button"
import { MedecinFolder } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit, Eye } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export const columns: ColumnDef<MedecinFolder>[] = [
  {
    accessorKey: "ref",
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
    accessorKey: "firstName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prenom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Birthday
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "qualification",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Qualification
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "genre",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Genre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "adresse",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Adresse
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: '_id',
    header: "Actions",
    cell: ({ row }) => {
        const userId = row.original._id
        
        return (
            <div className="flex gap-2">
                <Button size={"icon"}> <Link href={`/dashboard/personnels/${userId}`} ><Edit size={16}/></Link> </Button>
                <Button size={"icon"} variant={"destructive"}> <Link href={`/dashboard/personnels/dashboard/${userId}`} ><Eye size={16}/></Link> </Button>
            </div>
        )
    }
  }
]
