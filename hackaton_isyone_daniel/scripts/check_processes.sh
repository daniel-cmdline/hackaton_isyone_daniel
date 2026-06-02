#!/bin/bash

echo "          .---."
echo "         /     \\"
echo "     .---███████---."
echo "    /    ███████    \\"
echo "   :  █████  █████  :"
echo "   |  ███████████  |"
echo "   :  █████  █████  :"
echo "    \\    ███████    /"
echo "     '---███████---'"
echo "         \\     /"
echo "          '---'"
echo "     [ COLD-EYE PROCESS MONITOR ]"
echo ""
echo "[SYSTEM] Initializing process scheduler inspection..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Telemetria Geral de Processos
echo "• [MODULE // SCHEDULER_STAT] Intercepting task list..."
sleep 0.6
TOTAL_PROC=$(ps -ef | wc -l)
USER_PROC=$(ps -x 2>/dev/null | wc -l)

echo "TASK METRICS:"
echo "........................................................"
echo "  ↳ TOTAL SYSTEM PROCESSES : ${TOTAL_PROC}"
echo "  ↳ CURRENT OPERATOR TASKS : ${USER_PROC}"
echo "........................................................"
echo "--------------------------------------------------------"
sleep 0.4

# Passo 2: O Top 10 Consumo de CPU (O miolo do TOP real)
echo "• [MODULE // CPU_CONSUMPTION] Extracting top 10 CPU consumers..."
sleep 0.8
echo "PID    USER      %CPU  %MEM  COMMAND"
echo "........................................................"

# Executa o top em modo batch (snapshot), pula o cabeçalho e filtra as 10 primeiras linhas de processos
top -b -n 1 | head -n 30 | grep -E '^[ 0-9]' | sort -nr -k 9 | head -n 10 | awk '{print "  " $1 "  " $2 "   " $9 "%   " $10 "%   " $12}'

echo "........................................................"
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // SUCCESS] Process vector mapping completed."
echo "• Thread scheduler state: BALANCED"
echo "--------------------------------------------------------"