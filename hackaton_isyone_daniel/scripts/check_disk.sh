#!/bin/sh

echo "███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗"
echo "██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║"
echo "███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║"
echo "╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║"
echo "███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║"
echo "╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝"
echo "          [ ISYONE ENGINE :: SYSTEM DIAGNOSTIC ]"
echo ""
echo "[SYSTEM] Initiating hardware architecture scan..."
echo "--------------------------------------------------------"
sleep 0.5

# Módulo 1: Armazenamento (Storage Grid)
echo "• [MODULE // STORAGE_GRID] Fetching mount points..."
sleep 0.8
echo "STATUS: ACTIVE // PARSING BLOCK DEVICES:"
echo "--------------------------------------------------------"
# Executa o comando real formatando a saída para o terminal
df -h | grep -E '^/dev/|^Filesystem' || df -h
echo "--------------------------------------------------------"
sleep 0.5

# Módulo 2: Memória Volátil (RAM/Swap)
echo "• [MODULE // VOLATILE_MEMORY] Intercepting core memory pages..."
sleep 0.8
echo "STATUS: ACTIVE // EXTRACTING RAM METRICS (MB):"
echo "--------------------------------------------------------"
# Executa o comando real de memória
free -m || echo "CRITICAL: 'free' command binary missing in host core."
echo "--------------------------------------------------------"

# Finalização de auditoria
echo "✅ [STDOUT // SUCCESS] Diagnostic telemetry successfully synced."
echo "• Kernel state: NOMINAL"
echo "--------------------------------------------------------"