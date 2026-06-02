// lib/db.ts ou src/lib/db.ts
import { Pool } from 'pg';

// Configura o pool usando as variáveis de ambiente do container
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  host: process.env.POSTGRES_HOST || 'db', // 'localhost' para testar local, mudará para 'db' se o Next for pro docker-compose
  database: process.env.POSTGRES_DB || 'isy_automation',
  password: process.env.POSTGRES_PASSWORD || 'supersecretpassword',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
});

export const db = {
  // Exporta um método idêntico ao que a rota está esperando: db.query(...)
  query: (text: string, params?: any[]) => pool.query(text, params),
};