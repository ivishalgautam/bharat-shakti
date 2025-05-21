import TendersByPreferences from "@/components/tenders-by-preferences";
import { Suspense } from "react";

export default function TendersByPreferencesPage() {
  return (
    <Suspense>
      <TendersByPreferences />
    </Suspense>
  );
}
