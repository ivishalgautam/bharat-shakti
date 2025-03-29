import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TendersPagination({
  filteredTenders,
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        {Math.min(filteredTenders.length, (currentPage - 1) * itemsPerPage + 1)}{" "}
        to {Math.min(currentPage * itemsPerPage, filteredTenders.length)} of{" "}
        {filteredTenders.length} tenders
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
        <div className="flex items-center">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Show pages around current page
            let pageNum = i + 1;
            if (totalPages > 5) {
              if (currentPage > 3) {
                pageNum = currentPage - 3 + i;
              }
              if (currentPage > totalPages - 2) {
                pageNum = totalPages - 4 + i;
              }
            }

            return pageNum <= totalPages ? (
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
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
