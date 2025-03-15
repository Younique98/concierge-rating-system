import { Pool } from 'pg';

// Load environment variables only in Node.js environment
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

export default pool;
