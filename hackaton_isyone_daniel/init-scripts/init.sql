-- init-scripts/init.sql

-- Criação da tabela de tokens
CREATE TABLE IF NOT EXISTS api_tokens (
    id SERIAL PRIMARY KEY,
    token_value VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(100),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de logs de execução
CREATE TABLE IF NOT EXISTS script_logs (
    id SERIAL PRIMARY KEY,
    command VARCHAR(255) NOT NULL,
    executed_by_token VARCHAR(255) REFERENCES api_tokens(token_value),
    status VARCHAR(50) DEFAULT 'PENDING',
    stdout TEXT,
    stderr TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo um token padrão para você testar seus endpoints imediatamente
INSERT INTO api_tokens (token_value, description) 
VALUES ('isy_dev_token_secret_123', 'Token Local de Teste')
ON CONFLICT (token_value) DO NOTHING;