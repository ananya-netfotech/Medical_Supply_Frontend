export const transfers = [
  {
    unitId: "UNIT-0001",
    from: {
      name: "North India Pharmacy Network",
      type: "Pharmacy",
      location: "Delhi Branch",
    },
    to: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Noida Sector 62",
    },
    status: "Completed",
    timestamp: "4/22/2024, 5:30:00 AM",
    remarks: "Delivered to pharmacy",
  },
  {
    unitId: "UNIT-0002",
    from: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    to: {
      name: "North India Pharmacy Network",
      type: "Pharmacy",
      location: "Delhi Branch",
    },
    status: "Completed",
    timestamp: "4/18/2024, 5:30:00 AM",
    remarks: "Transferred to pharmacy network",
  },
  {
    unitId: "UNIT-0003",
    from: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Noida Sector 62",
    },
    to: {
      name: "Sneha Gupta",
      type: "Citizen",
      location: "Beneficiary Record",
    },
    status: "Completed",
    timestamp: "4/15/2024, 5:30:00 AM",
    remarks: "Dispensed to beneficiary",
  },
  {
    unitId: "UNIT-0004",
    from: {
      name: "System",
      type: "System",
      location: "Platform Ledger",
    },
    to: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    status: "Completed",
    timestamp: "4/15/2024, 5:30:00 AM",
    remarks: "Medicine unit created",
  },
  {
    unitId: "UNIT-0005",
    from: {
      name: "MediCare Pharmacy Network",
      type: "Pharmacy",
      location: "Pune Branch",
    },
    to: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Hyderabad Branch",
    },
    status: "Completed",
    timestamp: "4/10/2024, 5:30:00 AM",
    remarks: "Transferred between pharmacy branches",
  },
  {
    unitId: "UNIT-0006",
    from: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    to: {
      name: "MediCare Pharmacy Network",
      type: "Pharmacy",
      location: "Pune Branch",
    },
    status: "Completed",
    timestamp: "4/5/2024, 5:30:00 AM",
    remarks: "Released to pharmacy network",
  },
];

export const manufacturerTraceability = [
  {
    manufacturer: "Cipla Limited",
    branchLocation: "Mumbai Manufacturing Unit",
    drugTypes: ["Paracetamol 500mg", "Atorvastatin 20mg"],
    pharmaciesServed: 3,
    lastTransferDate: "4/22/2024",
    servedBranches: [
      "North India Pharmacy Network - Delhi",
      "MediCare Pharmacy Network - Pune",
      "MedPlus Health Services - Noida",
    ],
  },
  {
    manufacturer: "Sun Pharmaceuticals Ltd.",
    branchLocation: "Ahmedabad Manufacturing Unit",
    drugTypes: ["Amoxicillin 500mg", "Metformin 500mg"],
    pharmaciesServed: 2,
    lastTransferDate: "4/18/2024",
    servedBranches: [
      "MedPlus Health Services - Hyderabad",
      "Apollo Pharmacy Network - Bengaluru",
    ],
  },
  {
    manufacturer: "Bharat Lifecare Manufacturing",
    branchLocation: "Hyderabad Unit II",
    drugTypes: ["Insulin Glargine", "Cefixime 200mg"],
    pharmaciesServed: 4,
    lastTransferDate: "4/10/2024",
    servedBranches: [
      "Wellness Pharmacy - Chennai",
      "MediCare Pharmacy Network - Pune",
      "North India Pharmacy Network - Delhi",
      "MedPlus Health Services - Hyderabad",
    ],
  },
];