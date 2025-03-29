// Generate random date within a range
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Generate random amount within a range
function randomAmount(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

const authorities = [
  "Public Works Department",
  "Health Department",
  "Education Department",
  "Transport Department",
  "Agriculture Department",
  "Information Technology",
  "Defense",
];

const keywords = [
  "Central Government",
  "State Government",
  "Municipal Corporation",
  "Public Sector Undertaking",
  "Autonomous Body",
  "Railways",
];

const offices = [
  "Head Office",
  "Regional Office",
  "District Office",
  "Zonal Office",
  "Branch Office",
];

export const mockTenders = Array.from({ length: 25 }, (_, i) => {
  const tenderValue = randomAmount(100000, 10000000);
  const emdAmount = (Number.parseInt(tenderValue) * 0.02).toString(); // 2% of tender value

  return {
    id: Date.now(),
    name: `Tender for ${["Construction", "Supply", "Maintenance", "Development", "Installation"][Math.floor(Math.random() * 5)]} of ${["Roads", "Buildings", "Equipment", "Software", "Infrastructure", "Medical Supplies", "Educational Materials"][Math.floor(Math.random() * 7)]} - ${i + 1}`,
    tender_amount: Number.parseInt(randomAmount(100000, 10000000)),
    slug: `tender-${i + 1}`,
    bid_number: `BID-${new Date().getFullYear()}-${1000 + i}`,
    dated: new Date().toISOString().split("T")[0],
    bid_end_date_time: randomDate(
      new Date(),
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    ).toISOString(),
    authority: authorities[Math.floor(Math.random() * authorities.length)],
    keyword: keywords[Math.floor(Math.random() * keywords.length)],
    office: offices[Math.floor(Math.random() * offices.length)],
    item_gem_parts: "Various items as per specification",
    quantity: randomAmount(1, 100),
    uom: ["Units", "Pieces", "Kilograms", "Meters", "Liters"][
      Math.floor(Math.random() * 5)
    ],
    no_of_items: randomAmount(1, 10),
    minimum_average_annual_turnover: randomAmount(1000000, 5000000),
    years_of_past_experience: randomAmount(2, 10),
    evaluation_method: [
      "Quality and Cost Based Selection",
      "Least Cost Selection",
      "Fixed Budget Selection",
    ][Math.floor(Math.random() * 3)],
    emd_amount: emdAmount,
    tender_value: tenderValue,
    ote_lte: ["OTE", "LTE"][Math.floor(Math.random() * 2)],
    epbg_percentage: ["5%", "10%", "15%"][Math.floor(Math.random() * 3)],
    buyer_specification_document: [],
    drawing: [],
    consignee: ["Department Head", "Project Manager", "Procurement Officer"][
      Math.floor(Math.random() * 3)
    ],
    delivery_days: randomAmount(30, 180),
    distribution: "As per tender document",
    pre_qualification_criteria: "As specified in the tender document",
  };
});
