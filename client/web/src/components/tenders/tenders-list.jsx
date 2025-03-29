"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { mockTenders } from "@/lib/mock-data";
import TenderCard from "../cards/tender-card";
import TendersFilters from "./tenders-filters";
import TendersPagination from "./tenders-pagination";

export default function TendersListing() {
  const [filteredTenders, setFilteredTenders] = useState(mockTenders);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredTenders.length / itemsPerPage);

  // Get current page items
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredTenders.slice(indexOfFirstItem, indexOfLastItem);
  };

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <TendersFilters {...{ filteredTenders, setFilteredTenders }} />

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Tenders ({filteredTenders.length})
          </h2>
        </div>

        {filteredTenders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-center text-muted-foreground">
                No tenders found matching your filters.
              </p>
              {/* <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button> */}
            </CardContent>
          </Card>
        ) : (
          <>
            {getCurrentItems().map((tender) => (
              <TenderCard {...{ tender, getRemainingDays }} key={tender.id} />
            ))}

            {/* Pagination */}
            <TendersPagination
              {...{
                filteredTenders,
                currentPage,
                setCurrentPage,
                totalPages,
                itemsPerPage,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

function getRemainingDays(dateString) {
  const endDate = new Date(dateString);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
