import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Function to generate a styled HTML template for PDF
const generatePDFHTML = (audit) => {
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return '#e11d48';
      case 'High': return '#ea580c';
      case 'Medium': return '#d97706';
      default: return '#059669';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Closed': return '#059669';
      case 'Open': return '#e11d48';
      case 'Under Review': return '#2563eb';
      case 'Escalated': return '#ea580c';
      default: return '#6b7280';
    }
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Audit Report - ${audit.auditId}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background: white;
          padding: 40px;
          color: #1f2937;
          line-height: 1.5;
        }
        
        .report-container {
          max-width: 1200px;
          margin: 0 auto;
          background: white;
        }
        
        /* Header Styles */
        .header {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid #bfdbfe;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .logo {
          width: 50px;
          height: 50px;
          background: #2563eb;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo svg {
          width: 30px;
          height: 30px;
          color: white;
        }
        
        .title-section h1 {
          font-size: 24px;
          color: #1e3a8a;
          margin-bottom: 5px;
        }
        
        .title-section p {
          color: #3b82f6;
          font-size: 14px;
        }
        
        .audit-id {
          text-align: right;
        }
        
        .audit-id-label {
          font-size: 12px;
          font-weight: 600;
          color: #1e40af;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .audit-id-value {
          font-family: monospace;
          font-size: 20px;
          font-weight: bold;
          color: #1e3a8a;
          margin-top: 5px;
        }
        
        .action-text {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin-top: 15px;
        }
        
        .severity-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          background: ${getSeverityColor(audit.severity)}15;
          color: ${getSeverityColor(audit.severity)};
          margin-bottom: 10px;
        }
        
        .timestamp {
          font-size: 12px;
          color: #6b7280;
          margin-top: 5px;
        }
        
        /* Grid Layout */
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }
        
        /* Card Styles */
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          background: white;
          page-break-inside: avoid;
        }
        
        .card-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #eff6ff;
        }
        
        .card-title h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .info-label {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }
        
        .info-value {
          font-size: 13px;
          color: #1f2937;
          font-weight: 500;
        }
        
        /* Remarks Section */
        .remarks-section {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .remarks-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        .remarks-title h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .remarks-content {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.6;
        }
        
        /* Action Items */
        .actions-section {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .actions-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 15px;
        }
        
        .action-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 10px;
        }
        
        /* Timeline */
        .timeline-section {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
        }
        
        .timeline-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
        }
        
        .timeline-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .timeline-icon {
          flex-shrink: 0;
        }
        
        .timeline-content {
          flex: 1;
        }
        
        .timeline-content-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 5px;
        }
        
        .timeline-time {
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 5px;
        }
        
        .timeline-description {
          font-size: 13px;
          color: #6b7280;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          background: ${getStatusColor(audit.status)}15;
          color: ${getStatusColor(audit.status)};
        }
        
        /* Footer */
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
        }
        
        .footer p {
          margin: 5px 0;
        }
        
        /* Print Styles */
        @media print {
          body {
            padding: 0;
          }
          .card, .remarks-section, .actions-section, .timeline-section {
            break-inside: avoid;
          }
        }
        
        /* Utility Classes */
        .text-success { color: #059669; }
        .text-warning { color: #d97706; }
        .text-danger { color: #dc2626; }
        .text-info { color: #2563eb; }
        
        .bg-success { background: #d1fae5; }
        .bg-warning { background: #fed7aa; }
        .bg-danger { background: #fee2e2; }
        .bg-info { background: #dbeafe; }
      </style>
    </head>
    <body>
      <div class="report-container">
        <!-- Header -->
        <div class="header">
          <div class="header-content">
            <div class="logo-section">
              <div class="logo">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="title-section">
                <h1>Regulatory Audit Report</h1>
                <p>CDSCO - Central Drugs Standard Control Organization</p>
              </div>
            </div>
            <div class="audit-id">
              <div class="audit-id-label">Audit ID</div>
              <div class="audit-id-value">${audit.auditId}</div>
            </div>
          </div>
          <div class="action-text">${audit.action}</div>
          <div style="margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
            <span class="severity-badge">${audit.severity} Severity</span>
            <span class="timestamp">${audit.timestamp}</span>
          </div>
        </div>
        
        <!-- Key Information Grid -->
        <div class="grid-2">
          <!-- Actor Details -->
          <div class="card">
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <h3>Actor Details</h3>
            </div>
            <div class="info-row">
              <span class="info-label">Name</span>
              <span class="info-value">${audit.actor}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Role</span>
              <span class="info-value">${audit.role}</span>
            </div>
            <div class="info-row">
              <span class="info-label">IP Address</span>
              <span class="info-value">${audit.ipAddress}</span>
            </div>
          </div>
          
          <!-- Location & Region -->
          <div class="card">
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <h3>Location & Region</h3>
            </div>
            <div class="info-row">
              <span class="info-label">Region</span>
              <span class="info-value">${audit.region}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Module</span>
              <span class="info-value">${audit.module}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Audit Type</span>
              <span class="info-value">${audit.auditType}</span>
            </div>
          </div>
          
          <!-- Entity Information -->
          <div class="card">
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              <h3>Entity Information</h3>
            </div>
            <div class="info-row">
              <span class="info-label">Entity Name</span>
              <span class="info-value">${audit.entity}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Entity Type</span>
              <span class="info-value">${audit.entityType}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Reference ID</span>
              <span class="info-value">${audit.reference}</span>
            </div>
          </div>
          
          <!-- Status Information -->
          <div class="card">
            <div class="card-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <h3>Status Information</h3>
            </div>
            <div class="info-row">
              <span class="info-label">Current Status</span>
              <span class="info-value"><span class="status-badge">${audit.status}</span></span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Updated</span>
              <span class="info-value">${audit.timestamp}</span>
            </div>
          </div>
        </div>
        
        <!-- Remarks Section -->
        <div class="remarks-section">
          <div class="remarks-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <h3>Audit Remarks</h3>
          </div>
          <div class="remarks-content">
            ${audit.remarks}
          </div>
        </div>
        
        <!-- Required Actions -->
        <div class="actions-section">
          <div class="actions-title">Required Actions</div>
          ${audit.severity === "Critical" ? `
          <div class="action-item" style="background: #fee2e2;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span style="color: #dc2626;">Immediate action required - Escalate to senior officer</span>
          </div>
          ` : ''}
          ${audit.status === "Under Review" ? `
          <div class="action-item" style="background: #fed7aa;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style="color: #d97706;">Pending review - Complete verification within 48 hours</span>
          </div>
          ` : ''}
          ${audit.status === "Open" ? `
          <div class="action-item" style="background: #dbeafe;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span style="color: #2563eb;">Open case - Investigation in progress</span>
          </div>
          ` : ''}
        </div>
        
        <!-- Timeline -->
        <div class="timeline-section">
          <div class="timeline-title">Audit Timeline</div>
          
          <div class="timeline-item">
            <div class="timeline-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div class="timeline-content">
              <div class="timeline-content-title">Audit Initiated</div>
              <div class="timeline-time">${audit.timestamp}</div>
              <div class="timeline-description">Audit was triggered by system</div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${audit.status === 'Closed' ? '#059669' : '#2563eb'}" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="timeline-content">
              <div class="timeline-content-title">Audit Review</div>
              <div class="timeline-time">${audit.timestamp}</div>
              <div class="timeline-description">Review in progress by regulatory officer</div>
            </div>
          </div>
          
          <div class="timeline-item">
            <div class="timeline-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div class="timeline-content">
              <div class="timeline-content-title">Final Approval</div>
              <div class="timeline-time">Pending</div>
              <div class="timeline-description">Awaiting final approval from senior officer</div>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
          <p>This is an electronically generated regulatory audit report</p>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p>Report ID: ${audit.auditId}_${Date.now()}</p>
          <p>© CDSCO - Central Drugs Standard Control Organization</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Main PDF generation function
export const generateAuditPDF = async (audit) => {
  try {
    // Create a temporary iframe or new window for PDF generation
    const htmlContent = generatePDFHTML(audit);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Open in new window for printing/saving as PDF
    const printWindow = window.open(url, '_blank');
    
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          URL.revokeObjectURL(url);
        }, 500);
      };
    } else {
      // Fallback: Use html2canvas and jsPDF for direct PDF generation
      const element = document.createElement('div');
      element.innerHTML = htmlContent;
      document.body.appendChild(element);
      
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`audit-report-${audit.auditId}.pdf`);
      document.body.removeChild(element);
    }
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};

// Alternative method using html2canvas for single-page PDF
export const generateAuditPDFDirect = async (audit) => {
  // Get the modal content element
  const element = document.getElementById('audit-modal-content');
  
  if (!element) {
    throw new Error('Modal content not found');
  }
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`audit-report-${audit.auditId}.pdf`);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
};