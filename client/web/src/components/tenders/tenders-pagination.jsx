import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

export default function TendersPagination({ totalItems }) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  );

  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({ shallow: false, history: "push" })
      .withDefault(10),
  );

  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
      <p className="text-sm text-muted-foreground">
        Showing {Math.min(totalItems, (currentPage - 1) * pageSize + 1)} to{" "}
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems} tenders
      </p>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
            // Show pages around current page
            let pageNum = i + 1;
            if (pageCount > 5) {
              if (currentPage > 3) {
                pageNum = currentPage - 3 + i;
              }
              if (currentPage > pageCount - 2) {
                pageNum = pageCount - 4 + i;
              }
            }

            return pageNum <= pageCount ? (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(pageNum)}
                className="h-9 w-9"
              >
                {pageNum}
              </Button>
            ) : null;
          })}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
