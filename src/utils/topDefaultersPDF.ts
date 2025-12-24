import { jsPDF } from 'jspdf@2.5.1';
import autoTable from 'jspdf-autotable@3.8.2';

interface PDFData {
  fromDate: string;
  toDate: string;
  financialYear: string;
  yearType: string;
  zones: string[];
  wards: string[];
}

export const generateTopDefaultersPDF = (filters: PDFData) => {
  console.log('Starting PDF generation with filters:', filters);
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Sample data matching the table structure
  const tableData = [
    {
      srNo: 1,
      zone: 'Zone A',
      wardNo: '101',
      consumerNo: 'CNBD200021824',
      consumerName: 'Pawar Mahesh',
      mobileNo: '9876543210',
      fullAddress: 'Near Punjab National Bank, Shop No. 3-4, Building 1260',
      connectionType: 'Domestic',
      connectionSize: '15mm',
      connectionDate: '01/04/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'G1',
      subcategory: 'D',
      outstandingAmount: 690000,
      lastMonth: 0,
      outstandingBalance: 189500,
      currentMonth: 26500,
      interestAmount: 0,
      totalOutstanding: 26500,
      totalDue: 192150
    },
    {
      srNo: 2,
      zone: 'Zone B',
      wardNo: '102',
      consumerNo: 'CNBD200031602',
      consumerName: 'Korole Rajani',
      mobileNo: '9876543211',
      fullAddress: 'Jahilar Road-400, Near Rade Building',
      connectionType: 'Domestic',
      connectionSize: '15mm',
      connectionDate: '15/05/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'G1',
      subcategory: 'D',
      outstandingAmount: 262000,
      lastMonth: 0,
      outstandingBalance: 469400,
      currentMonth: 42500,
      interestAmount: 0,
      totalOutstanding: 42500,
      totalDue: 506800
    },
    {
      srNo: 3,
      zone: 'Zone A',
      wardNo: '103',
      consumerNo: 'CNBD706802D1966',
      consumerName: 'Pawar Mahesh',
      mobileNo: '9876543212',
      fullAddress: 'Near Village Hall, Shop 3-4, Building 1260',
      connectionType: 'Commercial',
      connectionSize: '20mm',
      connectionDate: '20/06/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'C1',
      subcategory: 'D',
      outstandingAmount: 750000,
      lastMonth: 0,
      outstandingBalance: 588400,
      currentMonth: 102500,
      interestAmount: 0,
      totalOutstanding: 102500,
      totalDue: 476300
    },
    {
      srNo: 4,
      zone: 'Zone C',
      wardNo: '104',
      consumerNo: 'CNBD408001C256',
      consumerName: 'Mendal Rajani',
      mobileNo: '9876543213',
      fullAddress: 'KMCE-R Area, Near Medical Store',
      connectionType: 'Domestic',
      connectionSize: '15mm',
      connectionDate: '10/07/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'G1',
      subcategory: 'D',
      outstandingAmount: 531000,
      lastMonth: 0,
      outstandingBalance: 421000,
      currentMonth: 34300,
      interestAmount: 0,
      totalOutstanding: 34300,
      totalDue: 440250
    },
    {
      srNo: 5,
      zone: 'Zone B',
      wardNo: '105',
      consumerNo: 'CNBD408001D008',
      consumerName: 'Pandharinath',
      mobileNo: '9876543214',
      fullAddress: 'KMCE-R, Deshmukh Medical Ground Floor',
      connectionType: 'Commercial',
      connectionSize: '25mm',
      connectionDate: '25/08/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'C1',
      subcategory: 'D',
      outstandingAmount: 700000,
      lastMonth: 0,
      outstandingBalance: 390000,
      currentMonth: 37000,
      interestAmount: 0,
      totalOutstanding: 37000,
      totalDue: 390000
    },
    {
      srNo: 6,
      zone: 'Zone A',
      wardNo: '106',
      consumerNo: 'CNBD408001S665',
      consumerName: 'Korole Rajani',
      mobileNo: '9876543215',
      fullAddress: 'Jahilar-473, Near Petrol Pump',
      connectionType: 'Domestic',
      connectionSize: '15mm',
      connectionDate: '30/09/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'G1',
      subcategory: 'D',
      outstandingAmount: 588400,
      lastMonth: 0,
      outstandingBalance: 355400,
      currentMonth: 32400,
      interestAmount: 0,
      totalOutstanding: 32400,
      totalDue: 388800
    },
    {
      srNo: 7,
      zone: 'Zone C',
      wardNo: '107',
      consumerNo: 'CNBD408014484',
      consumerName: 'Korole Rajani',
      mobileNo: '9876543216',
      fullAddress: 'Jahilar-473, Near Tirupati Building',
      connectionType: 'Domestic',
      connectionSize: '15mm',
      connectionDate: '05/10/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'G1',
      subcategory: 'D',
      outstandingAmount: 415500,
      lastMonth: 0,
      outstandingBalance: 345630,
      currentMonth: 35000,
      interestAmount: 0,
      totalOutstanding: 35000,
      totalDue: 355440
    },
    {
      srNo: 8,
      zone: 'Zone B',
      wardNo: '108',
      consumerNo: 'CNBD408051560',
      consumerName: 'Pawar Commercial',
      mobileNo: '9876543217',
      fullAddress: 'Jahilar-320, Commercial Complex',
      connectionType: 'Commercial',
      connectionSize: '25mm',
      connectionDate: '12/11/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'C2',
      subcategory: 'D',
      outstandingAmount: 733000,
      lastMonth: 0,
      outstandingBalance: 310000,
      currentMonth: 29000,
      interestAmount: 0,
      totalOutstanding: 29000,
      totalDue: 345680
    },
    {
      srNo: 9,
      zone: 'Zone A',
      wardNo: '109',
      consumerNo: 'CNBD408053910',
      consumerName: 'Deshmukh Sonali',
      mobileNo: '9876543218',
      fullAddress: 'Jahilar-320, Aadhaar Building',
      connectionType: 'Domestic',
      connectionSize: '15mm',
      connectionDate: '18/12/2020',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'G1',
      subcategory: 'D',
      outstandingAmount: 509000,
      lastMonth: 0,
      outstandingBalance: 302000,
      currentMonth: 27900,
      interestAmount: 0,
      totalOutstanding: 27900,
      totalDue: 325900
    },
    {
      srNo: 10,
      zone: 'Zone C',
      wardNo: '110',
      consumerNo: 'CNBD408036990',
      consumerName: 'Masare Medical',
      mobileNo: '9876543219',
      fullAddress: 'KMCE-R, Medical Complex',
      connectionType: 'Commercial',
      connectionSize: '25mm',
      connectionDate: '22/01/2021',
      closedDate: '-',
      meterNo: 'No Meter',
      category: 'C1',
      subcategory: 'D',
      outstandingAmount: 503000,
      lastMonth: 0,
      outstandingBalance: 362800,
      currentMonth: 27800,
      interestAmount: 0,
      totalOutstanding: 27800,
      totalDue: 331200
    }
  ];

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  // Add header with logo area
  const addHeader = () => {
    // Logo placeholder (you can add actual logo later)
    doc.setFillColor(0, 90, 167);
    doc.circle(20, 15, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('AMC', 20, 16, { align: 'center' });

    // Main Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Amravati Municipal Corporation', pageWidth / 2, 12, { align: 'center' });
    
    // Subtitle
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Water Supply Department', pageWidth / 2, 18, { align: 'center' });
    
    // Report Title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38); // Red color
    doc.text('Top Defaulters List', pageWidth / 2, 25, { align: 'center' });
    
    // Financial Year
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Financial Year: ${filters.financialYear || '2024-25'}`, pageWidth / 2, 31, { align: 'center' });

    // Date and Time in top right
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    doc.setFontSize(8);
    doc.text(`Date: ${dateStr} ${timeStr}`, pageWidth - 15, 10, { align: 'right' });

    // Filter Info
    doc.setFontSize(8);
    let filterY = 35;
    if (filters.fromDate || filters.toDate) {
      const fromDateStr = filters.fromDate ? new Date(filters.fromDate).toLocaleDateString('en-IN') : '-';
      const toDateStr = filters.toDate ? new Date(filters.toDate).toLocaleDateString('en-IN') : '-';
      doc.text(`Period: ${fromDateStr} to ${toDateStr}`, 15, filterY);
      filterY += 4;
    }
    if (filters.yearType) {
      doc.text(`Year Type: ${filters.yearType}`, 15, filterY);
    }
  };

  addHeader();

  // Prepare table data
  const tableRows = tableData.map(row => [
    row.srNo.toString(),
    row.zone,
    row.wardNo,
    `${row.consumerNo}\n${row.consumerName}\nMob: ${row.mobileNo}`,
    row.fullAddress,
    `${row.connectionType}\n${row.connectionSize}`,
    row.connectionDate,
    row.closedDate,
    row.meterNo,
    row.category,
    row.subcategory,
    formatCurrency(row.outstandingAmount),
    row.lastMonth.toString(),
    formatCurrency(row.outstandingBalance),
    formatCurrency(row.currentMonth),
    row.interestAmount.toString(),
    formatCurrency(row.totalOutstanding),
    formatCurrency(row.totalDue)
  ]);

  // Calculate totals
  const totalOutstanding = tableData.reduce((sum, row) => sum + row.outstandingAmount, 0);
  const totalBalance = tableData.reduce((sum, row) => sum + row.outstandingBalance, 0);
  const totalCurrent = tableData.reduce((sum, row) => sum + row.currentMonth, 0);
  const totalDue = tableData.reduce((sum, row) => sum + row.totalDue, 0);

  // Add table
  autoTable(doc, {
    head: [[
      'Sr.\nNo.',
      'Zone',
      'Ward',
      'Consumer Details',
      'Full Address',
      'Type',
      'Conn.\nDate',
      'Closed\nDate',
      'Meter',
      'Cat',
      'Sub',
      'Outstanding\n(₹)',
      'Last\nMth',
      'Balance\n(₹)',
      'Current\n(₹)',
      'Interest\n(₹)',
      'Total\n(₹)',
      'Due\n(₹)'
    ]],
    body: tableRows,
    startY: 42,
    theme: 'grid',
    tableWidth: 'auto',
    margin: { left: 8, right: 8 },
    styles: {
      fontSize: 5,
      cellPadding: 0.5,
      lineColor: [100, 100, 100],
      lineWidth: 0.1,
      overflow: 'linebreak',
      cellWidth: 'wrap',
    },
    headStyles: {
      fillColor: [0, 90, 167],
      textColor: [255, 255, 255],
      fontSize: 5,
      fontStyle: 'bold',
      halign: 'center',
      valign: 'middle',
      cellPadding: 1,
      minCellHeight: 7,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 'auto' },
      1: { halign: 'center', cellWidth: 'auto' },
      2: { halign: 'center', cellWidth: 'auto' },
      3: { fontSize: 4.5, cellWidth: 'auto' },
      4: { fontSize: 4.5, cellWidth: 'auto' },
      5: { fontSize: 4.5, halign: 'center', cellWidth: 'auto' },
      6: { halign: 'center', fontSize: 4.5, cellWidth: 'auto' },
      7: { halign: 'center', fontSize: 4.5, cellWidth: 'auto' },
      8: { halign: 'center', fontSize: 4.5, cellWidth: 'auto' },
      9: { halign: 'center', cellWidth: 'auto' },
      10: { halign: 'center', cellWidth: 'auto' },
      11: { halign: 'right', fontStyle: 'bold', fontSize: 4.5, cellWidth: 'auto' },
      12: { halign: 'right', fontSize: 4.5, cellWidth: 'auto' },
      13: { halign: 'right', fontStyle: 'bold', fontSize: 4.5, cellWidth: 'auto' },
      14: { halign: 'right', textColor: [234, 88, 12], fontSize: 4.5, cellWidth: 'auto' },
      15: { halign: 'right', fontSize: 4.5, cellWidth: 'auto' },
      16: { halign: 'right', textColor: [37, 99, 235], fontSize: 4.5, cellWidth: 'auto' },
      17: { halign: 'right', textColor: [220, 38, 38], fontStyle: 'bold', fontSize: 4.5, cellWidth: 'auto' },
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    didDrawPage: (data) => {
      // Add footer
      const pageCount = doc.getNumberOfPages();
      const currentPage = doc.getCurrentPageInfo().pageNumber;
      
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        `Page ${currentPage} of ${pageCount}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      
      doc.text(
        'Generated by Maharashtra Water Billing System',
        pageWidth / 2,
        pageHeight - 6,
        { align: 'center' }
      );
    },
  });

  // Add summary section
  const finalY = (doc as any).lastAutoTable.finalY || 150;
  
  doc.setFillColor(255, 243, 224);
  doc.rect(15, finalY + 5, pageWidth - 30, 20, 'F');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Summary:', 20, finalY + 12);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Total Defaulters: ${tableData.length}`, 20, finalY + 17);
  doc.text(`Total Outstanding Amount: ₹${formatCurrency(totalOutstanding)}`, 70, finalY + 17);
  doc.text(`Total Outstanding Balance: ₹${formatCurrency(totalBalance)}`, 140, finalY + 17);
  doc.text(`Total Current Month: ₹${formatCurrency(totalCurrent)}`, 20, finalY + 22);
  doc.text(`Grand Total Due: ₹${formatCurrency(totalDue)}`, 70, finalY + 22);

  // Open PDF in new window
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};