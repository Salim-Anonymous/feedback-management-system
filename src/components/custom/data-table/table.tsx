import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  getSortedRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import ModeratorEdit from "../moderator-edit-dialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    });
  

  const ctx = api.useContext();
  const deleteCategory = api.category.deleteCategory.useMutation({
    onSuccess: () => {
      void ctx.category.getAll.invalidate();
    },
  });
  const updateCategory = api.category.updateCategory.useMutation({
    onSuccess: () => {
      void ctx.category.getAll.invalidate();
    },
  });

  return (
    <div
      className="w-[320px] sm:w-[425px] md:w-[500px] lg:w-[700px] xl:w-[900px] 2xl:w-[1100px]"
    >
      <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead>Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row,sl) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell,index) => {
                  if (index === 0) {
                    return (
                      <TableCell
                        key={cell.id}
                        className="text-center"
                      >
                        {sl+1}
                      </TableCell>
                    );
                  }
                  return<TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                })}
                <TableCell>
                  <div className="flex justify-center space-x-2">
                    <ModeratorEdit categoryId={row.original.id}/>
                    <Button variant="destructive" onClick={() => {
                      deleteCategory.mutate({
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        categoryId: row.original.id,
                      });
                    }}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length+1} className="h-24 text-center">
                No moderator found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4 mx-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  </div>
  );
}
