import TenderDetails from "@/components/tender-details";
import tender from "@/services/tender";
import React from "react";

export default async function TenderDetailsPage({ params: { slug } }) {
  const tenderData = await tender.getBySlug(slug);
  return (
    <div>
      {/* <pre>{JSON.stringify(tenderData, null, 2)}</pre>; */}
      <TenderDetails data={tenderData} />
    </div>
  );
}
