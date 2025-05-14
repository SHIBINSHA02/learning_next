import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, {
  connect_timeout: 60, // Increase connection timeout to 60 seconds
  idle_timeout: 30,    // How long a connection can be idle before being closed
  max_lifetime: 60 * 10, // Max lifetime of a connection
  ssl: { rejectUnauthorized: false }, // For development environments
});


async function listInvoices() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
    return data;
  } catch (error) {
    console.error("Error fetching invoices:", error); // Log the error
    throw error; // Rethrow the error to be caught in the GET function
  }
}

export async function GET() {
  
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
