import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";

export const generatePDF = async (data, title, startDate, endDate, graphId, siteData,) => {
    console.log(siteData)
    const doc = new jsPDF();
    const websiteName = siteData?.websiteName
    const email = siteData?.email
    const mobile = siteData?.mobile
    const logoImg = new Image();
    logoImg.src = "/logo.webp";

    await new Promise((resolve) => {
        logoImg.onload = resolve;
    });

    doc.addImage(logoImg, 'PNG', 14, 5, 40, 15); // Adjust x, y, width, height

    // Add title and metadata
    doc.setLineWidth(0.3);
    doc.line(14, 24, 200, 24);
    doc.setLineWidth(0.3);
    doc.line(60, 0, 60, 24);
    doc.setFontSize(18);
    doc.text(title, 14, 31);
    doc.setFontSize(14);
    doc.text(websiteName || "", 70, 11);
    doc.setFontSize(11);
    doc.text(`${email || ""} / ${mobile || ""}`, 70, 16);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 37);

    // Capture the graph as an image
    const graphElement = document.getElementById(graphId);
    if (graphElement) {
        const canvas = await html2canvas(graphElement);
        const graphImgData = canvas.toDataURL('image/png');
        doc.addImage(graphImgData, 'PNG', 14, 40, 180, 90);
    }

    const columns = [
        "Date", "Nav", "Amt", "Unit", "Cumulative Unit", "Cumulative Amt", "Valuation"
    ];

    const rows = data?.map((item) => [
        item.navDate,
        item.nav,
        item.cashFlow,
        item.units,
        item.cumulitiveUnits,
        item.amount,
        item.currentValue,
    ]);

    const tableStartY = graphElement ? 140 : 40;

    autoTable(doc, {
        head: [columns],
        body: rows,
        startY: tableStartY,
    });

    doc.setFontSize(10);
    doc.text(
        "Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully.",
        14,
        doc.internal.pageSize.height - 10
    );

    doc.save(`${title}.pdf`);
};
