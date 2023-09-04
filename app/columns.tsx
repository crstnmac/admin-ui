import { ColumnDef } from "@tanstack/react-table"
import { DeleteIcon, Edit2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import userStore from "@/store"
import React from "react"

export type User = {
  id: string,
  name: string,
  email: string,
  role: string,
}

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  }, {
    id: 'actions',
    cell: ({ row }) => {

      const id = row.original.id

      const { removeUser } = userStore()

      function deleteUser() {
        removeUser(id)
      }

      return (
        <div className="flex flex-row gap-2">
          <Button >
            <Edit2Icon />
          </Button>
          <Button>
            <DeleteIcon onClick={deleteUser} />
          </Button>
        </div>
      )
    }
  }
]