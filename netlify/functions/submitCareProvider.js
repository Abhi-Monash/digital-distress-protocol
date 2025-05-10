const { Client } = require("pg");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = JSON.parse(event.body);

  const {
    user_id,
    firstName,
    lastName,
    date,
    time,
    category,
    categoryA, // optional: { q1, q2, q3, q4 }
  } = body;

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Step 1: Ensure table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS care_provider_details (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT UNIQUE,
        first_name TEXT,
        last_name TEXT,
        form_date DATE,
        form_time TIME,
        category TEXT,
        catA_q1 TEXT,
        catA_q2 TEXT,
        catA_q3 TEXT,
        catA_q4 TEXT,
        submitted_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Step 2: Upsert basic user data
    await client.query(
      `INSERT INTO care_provider_details 
    (user_id, first_name, last_name, form_date, form_time, category, catA_q1, catA_q2, catA_q3, catA_q4)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
      [
        user_id,
        firstName,
        lastName,
        date,
        time,
        category,
        categoryA?.q1 || null,
        categoryA?.q2 || null,
        categoryA?.q3 || null,
        categoryA?.q4 || null,
      ]
    );

    await client.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
