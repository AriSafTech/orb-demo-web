import React, { useState } from "react"; // Import useState hook
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const maxPageButtons = 5; // Maximum number of page buttons to display
  const [selectedPageSize, setSelectedPageSize] = useState(
    table.getState().pagination.pageSize,
  ); // State to keep track of selected page size

  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // Calculate the range of pages to display
  const getPageNumbers = () => {
    let startPage = Math.max(0, pageIndex - Math.floor(maxPageButtons / 2));
    let endPage = startPage + maxPageButtons - 1;

    if (endPage >= pageCount) {
      endPage = pageCount - 1;
      startPage = Math.max(0, endPage - maxPageButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${selectedPageSize}`} // Use selectedPageSize here
            onValueChange={(value: any) => {
              setSelectedPageSize(Number(value)); // Update selectedPageSize state
              table.setPageSize(Number(value)); // Update table page size
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={selectedPageSize} />{" "}
              {/* Use selectedPageSize as placeholder */}
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          {pageNumbers[0] > 0 && (
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(0)}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
          )}

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant="outline"
              className={`h-8 w-8 p-0 ${
                page === pageIndex
                  ? "bg-primary text-white" // Change this to your desired active color
                  : "hover:shadow-lg"
              }`}
              onClick={() => page !== pageIndex && table.setPageIndex(page)}
              disabled={page === pageIndex}
            >
              {page + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          {pageNumbers[pageNumbers.length - 1] < pageCount - 1 && (
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
