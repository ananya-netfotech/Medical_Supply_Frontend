import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  complianceSummary,
  complianceChecklist,
  categoryBreakdown,
  stateRisk,
  recentActions,
} from "./constants";

export async function generatePDFReport(filteredAlerts, criticalCount) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Header
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("Compliance Monitoring Report", 20, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 35);
  doc.text("CDSCO & State Drug Control Authorities", 20, 42);

  doc.setTextColor(0, 0, 0);

  let yPos = 60;

  // Executive Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Executive Summary", 20, yPos);
  yPos += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Active Compliance Alerts: ${filteredAlerts.length}`, 20, yPos);
  yPos += 6;
  doc.text(`Critical Alerts: ${criticalCount}`, 20, yPos);
  yPos += 6;
  doc.text(`High Priority Alerts: ${filteredAlerts.filter((a) => a.severity === "High").length}`, 20, yPos);
  yPos += 6;
  doc.text(`Open Compliance Rate: 78%`, 20, yPos);
  yPos += 6;
  doc.text(`License Exceptions: 14 (6 expired / 8 renewal due)`, 20, yPos);
  yPos += 6;
  doc.text(`Recall Watch Active: 5`, 20, yPos);
  yPos += 6;
  doc.text(`PM-JAY Claim Flags: 21`, 20, yPos);
  yPos += 12;

  // Summary Cards
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Compliance Summary", 20, yPos);
  yPos += 8;

  const summaryData = complianceSummary.map((item) => [
    item.label,
    item.value,
    item.change,
    item.detail,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Metric", "Value", "Change", "Details"]],
    body: summaryData,
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 25 },
      2: { cellWidth: 25 },
      3: { cellWidth: 80 },
    },
    margin: { left: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Compliance Readiness Scorecard
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Compliance Readiness Scorecard", 20, yPos);
  yPos += 8;

  const readinessData = complianceChecklist.map((item) => [
    item.label,
    `${item.score}%`,
    item.status,
    item.trend,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Category", "Score", "Status", "Trend"]],
    body: readinessData,
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 25 },
      2: { cellWidth: 30 },
      3: { cellWidth: 25 },
    },
    margin: { left: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Category Breakdown
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Alert Distribution by Category", 20, yPos);
  yPos += 8;

  const categoryData = categoryBreakdown.map((item) => [
    item.label,
    item.value.toString(),
    `${item.percent}%`,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Category", "Alert Count", "Percentage"]],
    body: categoryData,
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
    },
    margin: { left: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // State-wise Risk
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("State-wise Risk Assessment", 20, yPos);
  yPos += 8;

  const stateData = stateRisk.map((item) => [
    item.state,
    item.critical.toString(),
    item.high.toString(),
    item.medium.toString(),
    `${item.score}%`,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["State", "Critical", "High", "Medium", "Score"]],
    body: stateData,
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 40 },
    },
    margin: { left: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Recent Actions
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Recent Enforcement Actions", 20, yPos);
  yPos += 8;

  const actionsData = recentActions.map((item) => [
    item.action,
    item.entity,
    item.officer,
    item.time,
    item.status,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Action", "Entity", "Officer", "Time", "Status"]],
    body: actionsData,
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 45 },
      2: { cellWidth: 35 },
      3: { cellWidth: 25 },
      4: { cellWidth: 25 },
    },
    margin: { left: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Detailed Alerts
  if (yPos > 200) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Detailed Compliance Alerts", 20, yPos);
  yPos += 8;

  const alertsData = filteredAlerts.map((alert) => [
    alert.alertId,
    alert.category,
    alert.entity,
    alert.region,
    alert.severity,
    alert.status,
    alert.detected,
  ]);

  autoTable(doc, {
    startY: yPos,
    head: [["Alert ID", "Category", "Entity", "Region", "Severity", "Status", "Detected"]],
    body: alertsData,
    theme: "striped",
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 9 },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 35 },
      2: { cellWidth: 30 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 25 },
      6: { cellWidth: 25 },
    },
    margin: { left: 20 },
  });

  yPos = doc.lastAutoTable.finalY + 10;

  // Critical Alert Details
  const criticalAlerts = filteredAlerts.filter((a) => a.severity === "Critical");

  if (criticalAlerts.length > 0) {
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Critical Alert Details", 20, yPos);
    yPos += 8;

    for (const alert of criticalAlerts) {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text(`${alert.alertId} - ${alert.category}`, 20, yPos);
      yPos += 6;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);

      doc.text(`Entity: ${alert.entity}`, 25, yPos);
      yPos += 5;
      doc.text(`Region: ${alert.region}`, 25, yPos);
      yPos += 5;
      doc.text(`Regulation: ${alert.regulation}`, 25, yPos);
      yPos += 5;
      doc.text(`Finding: ${alert.finding.substring(0, 80)}...`, 25, yPos);
      yPos += 5;
      doc.text(`Required Action: ${alert.requiredAction.substring(0, 80)}...`, 25, yPos);
      yPos += 5;
      doc.text(`Status: ${alert.status}`, 25, yPos);
      yPos += 5;
      doc.text(`Detected: ${alert.detected}`, 25, yPos);
      yPos += 10;
    }
  }

  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Compliance Report - Page ${i} of ${pageCount} - Generated by CDSCO System`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  doc.save(`compliance_report_${new Date().toISOString().split("T")[0]}.pdf`);
}