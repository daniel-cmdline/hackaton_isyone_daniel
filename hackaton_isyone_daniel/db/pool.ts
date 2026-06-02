import { Pool } from 'pg';

// Força o host correto dependendo do comando que você rodou no terminal
const isDevelopment = process.env.NODE_ENV === 'development';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  
  // 🛡️ BLINDAGEM MÁXIMA: Se for npm run dev, força localhost. Se for produção (Docker), força db.
  host: isDevelopment ? 'localhost' : 'db', 
  
  database: process.env.POSTGRES_DB || 'isy_automation',
  password: process.env.POSTGRES_PASSWORD || 'supersecretpassword',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  connectionTimeoutMillis: 5000,
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};