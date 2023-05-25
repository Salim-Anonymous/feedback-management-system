import React from "react";
import AppShell from "@/components/custom/appshell";
import { api } from "@/utils/api";
import CategoryDialog from "@/components/custom/add-category";
import { type ColumnDef } from "@tanstack/react-table";
import { type NextPage } from "next";
import { DataTable } from "@/components/custom/data-table/table";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

type CategoryData = {
  id: string;
  moderator: string;
  category: string;
};

const columns: ColumnDef<CategoryData>[] = [
  {
    accessorKey: "id",
    header: "Sl No.",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "moderator",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Moderator
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
];

const Admin: NextPage = () => {
  const { data: session } = useSession();
  if (session?.user?.role !== "ADMIN") {
    return (
      <AppShell>
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="text-center text-2xl font-bold">
            You are not authorized to access this page
          </h1>
        </div>
      </AppShell>
    );
  }
  const { data: categories } = api.category.getAll.useQuery();
  const { data: users } = api.user.getAll.useQuery({ text: "" });
  const data = categories?.map((category, index) => {
    const { id, name, moderatorId } = category;
    return {
      id: id,
      name,
      moderator: users?.find((user) => user.id === moderatorId)?.name,
    };
  });
  /**
   *
   * **/
  return (
    <AppShell>
      <div className="flex flex-col items-start justify-start">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore*/}
        <DataTable columns={columns} data={data} />
        <CategoryDialog />
      </div>
    </AppShell>
  );
};
export default Admin;
