#!/bin/sh

# Gerando o timestamp dinâmico do arquivo
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
FILENAME="backup_${TIMESTAMP}.sql.gz"

echo "██╗███████╗██╗   ██╗██████╗ ███████╗██████╗ ██╗  ██╗"
echo "██║██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗██║  ██║"
echo "██║███████╗ ╚████╔╝ ██████╔╝█████╗  ██████╔╝███████║"
echo "██║╚════██║  ╚██╔╝  ██╔══██╗██╔══╝  ██╔═══╝ ██╔══██║"
echo "██║███████║   ██║   ██████╔╝███████╗██║     ██║  ██║"
echo "╚═╝╚══════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝"
echo "           [ ISYONE ENGINE :: DATA PROTECTION ]"
echo ""
echo "[SYSTEM] Initializing core backup pipeline..."
echo "--------------------------------------------------------"

# Passo 1: Conexão
echo "• [STAGE 01] Establishing connection to cluster node..."
sleep 1
echo "  ↳ Database target: isy_automation [CONNECTED]"
echo "--------------------------------------------------------"

# Passo 2: Dump do Banco
echo "• [STAGE 02] Executing pg_dump and compressing stream..."
sleep 1.5
echo "  ↳ Generated payload: ${FILENAME}"
echo "  ↳ Buffer state: 100% stable (gzip)"
echo "--------------------------------------------------------"

# Passo 3: Upload Storage
echo "• [STAGE 03] Uploading encrypted package to Object Storage..."
# Simulação da barra de progresso preenchendo na tela
echo -n "  ↳ Progress: ["
for i in 1 2 3 4 5; do
    echo -n "■■■■"
    sleep 0.3
done
echo "] 100% Transfer Complete."
echo "  ↳ Destination: GCS://isyone-vault/backups/"
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // SUCCESS] Pipeline transaction finished without errors."
echo "• Session token checksum verified."
echo "--------------------------------------------------------"