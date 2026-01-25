import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoice = (orderData, reduxSeller) => {
	const doc = new jsPDF();

	/* ================= HEADER ================= */
	doc.setFontSize(18);
	doc.setFont("helvetica", "bold");
	doc.text("SAAFI ARIEL", 14, 20);

	doc.setFontSize(10);
	doc.setFont("helvetica", "normal");
	doc.text("ISO Certified Company", 14, 26);
	doc.text("Mayadevi-01, Pakadi Kapilvastu, Nepal", 14, 32);
	doc.text("+977-982-6448200 | saafi2074@gmail.com", 14, 37);

	doc.line(14, 42, 196, 42);

	/* ================= INVOICE INFO ================= */
	doc.setFont("helvetica", "bold");
	doc.text("INVOICE", 150, 20);

	doc.setFont("helvetica", "normal");
	doc.text(`Invoice ID: #${orderData._id.slice(-6)}`, 150, 28);
	doc.text(`Date: ${new Date(orderData.createdAt).toDateString()}`, 150, 34);
	doc.text(`Status: ${orderData.status.toUpperCase()}`, 150, 40);

	/* ================= BILL TO ================= */
	const seller =
		typeof orderData.sellerId === "object" && orderData.sellerId !== null
			? orderData.sellerId
			: reduxSeller || {};

	const sellerName = seller.name || "N/A";
	const sellerAddress = seller.address || "Address not available";
	const sellerPhone = seller.phone || "N/A";

	doc.setFont("helvetica", "bold");
	doc.text("BILL TO:", 14, 52);

	doc.setFont("helvetica", "normal");
	doc.text(String(sellerName), 14, 58);
	doc.text(String(sellerAddress), 14, 64);
	doc.text(`Phone: ${String(sellerPhone)}`, 14, 70);

	/* ================= ITEMS TABLE ================= */
	const tableData = orderData.items.map((item, index) => {
		const basePrice = item.qty * item.productId.packSize * item.price;
		const finalPrice =
			item.discount > 0
				? basePrice - (basePrice * item.discount) / 100
				: basePrice;

		return [
			index + 1,
			item.productId.name,
			item.qty,
			item.productId.packSize,
			`₹${item.price}`,
			item.discount ? `${item.discount}%` : "-",
			`₹${finalPrice}`,
		];
	});

	autoTable(doc, {
		startY: 80,
		head: [["#", "Product", "Qty", "Pack", "Unit Price", "Discount", "Total"]],
		body: tableData,
		theme: "grid",
		styles: { fontSize: 9, cellPadding: 4 },
		headStyles: {
			fillColor: [79, 70, 229],
			textColor: 255,
			fontStyle: "bold",
		},
	});

	/* ================= CALCULATIONS ================= */
	const subtotal = orderData.items.reduce(
		(sum, item) => sum + item.qty * item.productId.packSize * item.price,
		0
	);

	const savings = subtotal - orderData.totalAmount;

	/* ================= TOTALS ================= */
	/* ================= TOTALS ================= */
	const finalY = doc.lastAutoTable.finalY + 12;

	// Background box
	doc.setFillColor(79, 70, 229); // indigo
	doc.roundedRect(120, finalY - 8, 76, 40, 4, 4, "F");

	// Text inside box
	doc.setTextColor(255, 255, 255);

	doc.setFontSize(10);
	doc.setFont("helvetica", "normal");
	doc.text(`Subtotal`, 124, finalY);
	doc.text(`Savings`, 124, finalY + 8);

	doc.setFont("helvetica", "bold");
	doc.text(`Rs. ${subtotal}`, 180, finalY, { align: "right" });
	doc.text(`- Rs. ${savings}`, 180, finalY + 8, { align: "right" });

	// Divider line
	doc.setDrawColor(255, 255, 255);
	doc.line(124, finalY + 12, 188, finalY + 12);

	// Grand Total
	doc.setFontSize(14);
	doc.text(`GRAND TOTAL`, 124, finalY + 22);
	doc.setFontSize(18);
	doc.text(`${orderData.totalAmount}`, 188, finalY + 22, {
		align: "right",
	});

	// Reset colors
	doc.setTextColor(0, 0, 0);

	/* ================= FOOTER ================= */
	doc.setFontSize(9);
	doc.setFont("helvetica", "italic");
	doc.text("Thank you for doing business with Saafi Ariel", 14, 285);

	doc.save(`Invoice_${orderData._id.slice(-6)}.pdf`);
};
