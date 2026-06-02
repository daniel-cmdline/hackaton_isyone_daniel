#!/bin/bash
echo "[*] Sincronizando buffers com o disco..."
sync
echo "[*] Despejando caches da memória RAM (Requer privilégios)..."
# No Docker isso pode dar "Permissão Negada", o que é excelente para testar os logs de erro da sua API!
echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || echo "Acesso negado: Root necessário para limpar a RAM."
echo "[+] Procedimento finalizado."
