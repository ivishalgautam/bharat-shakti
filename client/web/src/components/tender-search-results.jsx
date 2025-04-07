"use client";

import { useState } from "react";
import {
  X,
  Calendar,
  Building2,
  MapPin,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AllTendersListing from "./tenders/all-tenders-list";
import { ScrollArea } from "./ui/scroll-area";
import TendersFiltersLayout from "./layout/tenders-filters-layout";

// Mock data for tender results
const MOCK_TENDERS = [
  {
    id: "TEN-2023-001",
    title: "Construction of New Municipal Building",
    category: "Construction",
    location: "New York, USA",
    deadline: "2023-12-15",
    budget: "$2.5M - $3M",
    description:
      "Seeking qualified contractors for the construction of a new 3-story municipal building with sustainable features and modern facilities.",
  },
  {
    id: "TEN-2023-002",
    title: "IT Infrastructure Upgrade for Government Offices",
    category: "IT & Technology",
    location: "London, UK",
    deadline: "2023-11-30",
    budget: "$500K - $750K",
    description:
      "Comprehensive upgrade of IT infrastructure including servers, networking equipment, and cybersecurity systems for multiple government offices.",
  },
  {
    id: "TEN-2023-003",
    title: "Healthcare Equipment Supply",
    category: "Healthcare",
    location: "Toronto, Canada",
    deadline: "2023-12-10",
    budget: "$1M - $1.5M",
    description:
      "Supply and installation of advanced medical equipment for a newly constructed wing of the regional hospital.",
  },
  {
    id: "TEN-2023-004",
    title: "Public Transportation Fleet Expansion",
    category: "Transportation",
    location: "Sydney, Australia",
    deadline: "2024-01-15",
    budget: "$5M - $7M",
    description:
      "Procurement of 20 electric buses and related charging infrastructure for the city's public transportation system.",
  },
  {
    id: "TEN-2023-005",
    title: "Solar Power Installation for Government Buildings",
    category: "Energy",
    location: "Berlin, Germany",
    deadline: "2023-12-20",
    budget: "$1.2M - $1.8M",
    description:
      "Installation of solar panels and related equipment on government buildings to reduce carbon footprint and energy costs.",
  },
];

export function TenderSearchResults({ onClose }) {
  const [tenders, setTenders] = useState(MOCK_TENDERS);
  const [sortBy, setSortBy] = useState("deadline");
  const [category, setCategory] = useState("");

  // Filter tenders based on category
  const filteredTenders = category
    ? tenders.filter((tender) => tender.category === category)
    : tenders;

  // Sort tenders based on sortBy
  const sortedTenders = [...filteredTenders].sort((a, b) => {
    if (sortBy === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex w-full max-w-6xl flex-col rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">Tender Search Results</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="h-[80vh] w-full">
          <TendersFiltersLayout>
            <AllTendersListing />
          </TendersFiltersLayout>
        </ScrollArea>
      </div>
    </div>
  );
}
