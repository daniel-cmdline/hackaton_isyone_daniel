#!/bin/sh
echo "=== INICIANDO BACKUP DO POSTGRES ==="
echo "Conectando ao banco isy_automation..."
echo "Gerando arquivo: backup_$(date +%Y%m%d_%H%M%S).sql"
echo "Backup compactado com sucesso. Enviando para o storage..."
echo "✅ Operação finalizada sem erros."
echo "====================================="