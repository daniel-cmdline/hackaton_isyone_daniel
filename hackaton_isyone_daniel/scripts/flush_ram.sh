#!/bin/bash

echo "██████╗██╗   ██╗██████╗ ███████╗██████╗ "
echo "██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗"
echo "██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝"
echo "██║       ╚██╔╝  ██╔═══╝ ██╔══╝  ██╔══██╗"
echo "███████╗   ██║   ██║     ███████╗██║  ██║"
echo "╚══════╝   ╚═╝   ╚═╝     ╚══════╝╚═╝  ╚═╝"
echo "          [ ISYONE ENGINE :: RESOURCE PURGE ]"
echo ""
echo "[SYSTEM] Initiating memory subsystem flush..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Sincronização de IO
echo "• [STAGE 01] Synchronizing dirty pages from RAM cache to disk storage..."
sleep 1.0
sync
echo "STATUS: SUCCESS // FILE SYSTEM BUFFERS FLUSHED TO HOST DRIVE"
echo "--------------------------------------------------------"
sleep 0.5

# Passo 2: Despejo de Cache de Páginas, Dentries e Inodes
echo "• [STAGE 02] Attacking volatile memory cache pages (/proc/sys/vm/)..."
sleep 0.8

# Tenta escrever o bit 3 para limpar a RAM. Captura o erro real se houver.
ERR_OUTPUT=$(echo 3 > /proc/sys/vm/drop_caches 2>&1)

if [ $? -eq 0 ]; then
    echo "STATUS: CRITICAL_SUCCESS // CACHE PURGED SUCCESSFULLY"
    echo "  ↳ Volatile page cache status: 100% CLEANED"
else
    echo "STATUS: SECURITY_DENIED // PRIVILEGE ESCALATION REQUIRED"
    echo "  ↳ OS System Error: ${ERR_OUTPUT}"
    echo "  ↳ Reason: Isyone Engine node is running without root privileges."
fi
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // FINISHED] Subsystem purge sequence finalized."
echo "• Kernel pipeline state returned to idle."
echo "--------------------------------------------------------"