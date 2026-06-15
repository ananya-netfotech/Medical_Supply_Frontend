import {
  Activity,
  AlertTriangle,
  Factory,
  Gavel,
} from "lucide-react";

export const auditSummary = [
  {
    label: "Total Audit Events",
    value: "1,482",
    detail: "Across manufacturers, pharmacies, claims and batches",
    icon: Activity,
    tone: "blue",
  },
  {
    label: "Manufacturer Audits",
    value: "286",
    detail: "License, batch and GMP-related reviews",
    icon: Factory,
    tone: "emerald",
  },
  {
    label: "Pending Review",
    value: "34",
    detail: "Require regulatory officer action",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    label: "Critical Findings",
    value: "11",
    detail: "High-risk issues requiring escalation",
    icon: Gavel,
    tone: "rose",
  },
];

export const manufacturerAuditScorecards = [
  {
    manufacturer: "Cipla Limited",
    location: "Mumbai Manufacturing Unit",
    licenseId: "LIC-MFG-CDSCO-2026-001",
    score: 92,
    status: "Compliant",
    lastAudit: "5/2/2024",
    nextAudit: "8/2/2024",
    findings: 2,
    risk: "Low",
  },
  {
    manufacturer: "Sun Pharmaceuticals Ltd.",
    location: "Ahmedabad Manufacturing Unit",
    licenseId: "LIC-MFG-CDSCO-2026-002",
    score: 78,
    status: "Observation",
    lastAudit: "4/25/2024",
    nextAudit: "7/25/2024",
    findings: 6,
    risk: "Medium",
  },
  {
    manufacturer: "Bharat Lifecare Manufacturing",
    location: "Hyderabad Unit II",
    licenseId: "LIC-MFG-CDSCO-2026-003",
    score: 64,
    status: "Action Required",
    lastAudit: "4/18/2024",
    nextAudit: "5/18/2024",
    findings: 11,
    risk: "High",
  },
];

export const auditEvents = [
  {
    auditId: "AUD-MFG-0001",
    timestamp: "5/3/2024, 10:45 AM",
    actor: "Regulatory Admin",
    role: "CDSCO Officer",
    module: "Manufacturer Licensing",
    entity: "Cipla Limited",
    entityType: "Manufacturer",
    action: "License extension approved",
    auditType: "License Audit",
    severity: "Low",
    status: "Closed",
    region: "Maharashtra",
    ipAddress: "10.21.45.122",
    reference: "LIC-MFG-CDSCO-2026-001",
    remarks:
      "License validity reviewed with approved drug type mapping and active batch controls verified.",
  },
  {
    auditId: "AUD-BAT-0002",
    timestamp: "5/3/2024, 09:30 AM",
    actor: "State Drug Inspector",
    role: "State Authority",
    module: "Medicine Traceability",
    entity: "BATCH003",
    entityType: "Medicine Batch",
    action: "Batch ownership chain reviewed",
    auditType: "Traceability Audit",
    severity: "Medium",
    status: "Under Review",
    region: "Karnataka",
    ipAddress: "10.21.41.087",
    reference: "BATCH003",
    remarks:
      "Transfer history reviewed from manufacturer to pharmacy. Two downstream acknowledgements pending.",
  },
  {
    auditId: "AUD-REC-0003",
    timestamp: "5/2/2024, 04:12 PM",
    actor: "CDSCO Quality Desk",
    role: "Quality Reviewer",
    module: "Batch Recalls",
    entity: "RECALL-BATCH003",
    entityType: "Recall Notice",
    action: "Recall issued for contaminated batch",
    auditType: "Recall Audit",
    severity: "Critical",
    status: "Open",
    region: "Maharashtra",
    ipAddress: "10.21.42.011",
    reference: "RECALL-BATCH003",
    remarks:
      "Recall initiated due to contamination detected during quality audit. Stock quarantine verification required.",
  },
  {
    auditId: "AUD-PMJAY-0004",
    timestamp: "5/2/2024, 01:20 PM",
    actor: "PM-JAY Review Cell",
    role: "Claims Reviewer",
    module: "PM-JAY Claims",
    entity: "CLAIM-PMJAY-99999999",
    entityType: "Healthcare Claim",
    action: "Claim approved after manual verification",
    auditType: "Claim Audit",
    severity: "Low",
    status: "Closed",
    region: "Delhi",
    ipAddress: "10.21.49.220",
    reference: "CLAIM-PMJAY-99999999",
    remarks:
      "Beneficiary eligibility, pharmacy license and medicine dispense record verified before approval.",
  },
  {
    auditId: "AUD-CMP-0005",
    timestamp: "5/1/2024, 05:50 PM",
    actor: "Compliance Desk",
    role: "Regulatory Compliance",
    module: "Compliance Alerts",
    entity: "North India Pharma Distributors",
    entityType: "Distributor",
    action: "Suspicious transfer velocity flagged",
    auditType: "Distribution Audit",
    severity: "High",
    status: "Escalated",
    region: "Delhi",
    ipAddress: "10.21.44.077",
    reference: "ALRT-DIST-022",
    remarks:
      "Unusual transfer pattern detected between distributor and pharmacy. Supporting documents requested.",
  },
  {
    auditId: "AUD-MFG-0006",
    timestamp: "4/30/2024, 11:15 AM",
    actor: "Regulatory Admin",
    role: "CDSCO Officer",
    module: "Drug Registration",
    entity: "Atorvastatin 20mg",
    entityType: "Drug Type",
    action: "Drug type regulatory code updated",
    auditType: "Drug Registry Audit",
    severity: "Low",
    status: "Closed",
    region: "National",
    ipAddress: "10.21.45.122",
    reference: "CDSCO-ATV-020",
    remarks:
      "Regulatory metadata updated and linked manufacturer licenses revalidated.",
  },
  {
    auditId: "AUD-EXP-0007",
    timestamp: "4/29/2024, 03:35 PM",
    actor: "State Drug Inspector",
    role: "State Authority",
    module: "Compliance Alerts",
    entity: "BATCH005",
    entityType: "Medicine Unit",
    action: "Expired stock found in pharmacy inventory",
    auditType: "Expiry Audit",
    severity: "Critical",
    status: "Open",
    region: "Uttar Pradesh",
    ipAddress: "10.21.47.094",
    reference: "ALRT-EXP-008",
    remarks:
      "Expired medicine units still mapped to active pharmacy stock. Quarantine and inspection workflow required.",
  },
];

export const auditChecklist = [
  {
    title: "Manufacturing license validity",
    description:
      "Verify active CDSCO/state license, expiry, renewal history and licensed drug type mapping.",
    completion: 94,
  },
  {
    title: "Batch creation controls",
    description:
      "Check batch number, lot number, expiry date, drug type approval and manufacturer authorization.",
    completion: 88,
  },
  {
    title: "Ownership transfer trail",
    description:
      "Confirm every movement has sender, receiver, timestamp, branch and authorized role validation.",
    completion: 82,
  },
  {
    title: "Recall response audit",
    description:
      "Validate recall issuance, pharmacy acknowledgement, stock freeze, quarantine and release closure.",
    completion: 76,
  },
  {
    title: "PM-JAY claim evidence",
    description:
      "Match claim with beneficiary, pharmacy license, medicine dispense record and scheme eligibility.",
    completion: 71,
  },
];

export const monthlyAuditTrend = [
  { month: "Jan", audits: 180, findings: 24 },
  { month: "Feb", audits: 240, findings: 31 },
  { month: "Mar", audits: 310, findings: 42 },
  { month: "Apr", audits: 420, findings: 55 },
  { month: "May", audits: 332, findings: 34 },
];