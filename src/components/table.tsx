import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import serviceFunctions from "@/utils/services";
import Form from "./form";
import { Button } from "./ui/button";

interface FormData {
  id: string;
  term: string;
  description: string;
  category: string;
}

interface TableProps {
  selectedCategory: string;
  onEdit: (item: FormData) => void;
  onCategorySearchChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export default function ShadcnDataTable({
  selectedCategory,
  onEdit,
  onCategorySearchChange,
}: TableProps) {
  const [readableForm, setReadableForm] = React.useState<FormData[]>([]);

  React.useEffect(() => {
    const fetchFormData = async () => {
      try {
        const data = await serviceFunctions.getFormData();
        setReadableForm(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFormData();
  }, [readableForm]);

  const onDelete = (id: string) => {
    const enteredPassword = prompt("What's the magic word?");
    if (!enteredPassword) return;

    const deleteData = { id, password: enteredPassword };

    serviceFunctions
      .deleteFormData(deleteData)
      .catch(() => {
        window.alert(
          "Incorrect password or form submission failed. Please try again."
        );
      });
  };

  const columns = React.useMemo<ColumnDef<FormData>[]>(
    () => [
      {
        accessorKey: "term",
        header: "Term",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        id: "edit",
        header: "Edit",
        cell: ({ row }) => (
          <Button
            variant="outline"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>
        ),
      },
      {
        id: "delete",
        header: "Delete",
        cell: ({ row }) => (
          <Button
            className="bg-red-600 text-white"
            onClick={() => onDelete(row.original.id)}
          >
            Delete
          </Button>
        ),
      },
    ],
    [onEdit]
  );

  const table = useReactTable({
    data: selectedCategory
      ? readableForm.filter((data) => data.category === selectedCategory)
      : readableForm,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <div className="mb-4 flex justify-between">
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}