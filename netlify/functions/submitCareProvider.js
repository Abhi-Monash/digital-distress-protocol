const { Client } = require("pg");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { user_id, firstName, lastName, date, time, category } = JSON.parse(
    event.body
  );

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS care_provider_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT,
        first_name TEXT,
        last_name TEXT,
        form_date DATE,
        form_time TIME,
        category TEXT,
        submitted_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await client.query(query); // ensure table exists

    await client.query(
      `INSERT INTO care_provider_details 
        (user_id, first_name, last_name, form_date, form_time, category)
        VALUES ($1, $2, $3, $4, $5, $6)`,
      [user_id, firstName, lastName, date, time, category]
    );

    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
  console.error("Function error:", err); // 👈 Add this
  return {
    statusCode: 500,
    body: JSON.stringify({ error: err.message })
  };
}
};
