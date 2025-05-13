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
    categoryA,
    categoryB_SectionE,
    categoryC,
  } = body;

  // Extract Section E values if present
  const {
    q1: catB_e_q1,
    q2: catB_e_q2,
    q3: catB_e_q3,
  } = categoryB_SectionE || {};
  const {
    q1: catC_q1,
    q2: catC_q2,
    q3: catC_q3,
    q4: catC_q4,
    q5: catC_q5,
    q6: catC_q6,
  } = categoryC || {};

  const client = new Client({
    connectionString: process.env.NEON_DB_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    // Ensure table exists with required fields
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
        catB_e_q1 TEXT,
        catB_e_q2 TEXT,
        catB_e_q3 TEXT,
        catC_q1 TEXT,
        catC_q2 TEXT,
        catC_q3 TEXT,
        catC_q4 TEXT,
        catC_q5 TEXT,
        catC_q6 TEXT,
        submitted_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Insert or update record
    await client.query(
      `INSERT INTO care_provider_details (
        user_id, first_name, last_name, form_date, form_time, category,
        catA_q1, catA_q2, catA_q3, catA_q4,
        catB_e_q1, catB_e_q2, catB_e_q3,
        catC_q1, catC_q2, catC_q3, catC_q4, catC_q5, catC_q6
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10,
        $11, $12, $13,
        $14, $15, $16, $17, $18, $19
      )`,
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
        catB_e_q1 || null,
        catB_e_q2 || null,
        catB_e_q3 || null,
        catC_q1 || null,
        catC_q2 || null,
        catC_q3 || null,
        catC_q4 || null,
        catC_q5 || null,
        catC_q6 || null,
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
