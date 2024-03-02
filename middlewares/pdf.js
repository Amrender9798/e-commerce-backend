import PDFDocument from 'pdfkit';

const createPDF = (req, res, next) => {
  try {
    const doc = new PDFDocument();
    const filename = "user_order_details.pdf";

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Add a header
    doc.fontSize(16).text("User Order Details", { align: 'center' });
    doc.moveDown();

    // Assuming you have user order details in an array named 'orders'
    const orders = [
      { products: "Product1", address: "Address1", amount: 100 },
      { products: "Product2", address: "Address2", amount: 150 },
      // Add more orders as needed
    ];

    // Add a table with headers
    doc.table({
      headers: ['Products', 'Address', 'Amount'],
      rows: orders.map(order => [order.products, order.address, order.amount]),
      // You can customize the appearance of the table as needed
    });

    doc.end();
    next();
  } catch (error) {
    console.error('Error creating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default createPDF;
