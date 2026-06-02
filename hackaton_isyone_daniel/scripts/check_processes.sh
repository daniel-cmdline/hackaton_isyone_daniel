#!/bin/bash

# Cores para manter o clima de terminal operacional
VERDE='\033[0;32m'
CIANO='\033[0;36m'
SEM_COR='\033[0m'

clear
echo -e "${CIANO}"
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
echo -e "${SEM_COR}"
echo ""
echo "[SYSTEM] Initializing process scheduler inspection..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Telemetria Geral de Processos
echo -e "${CIANO}• [MODULE // SCHEDULER_STAT] Intercepting task list...${SEM_COR}"
sleep 0.6
TOTAL_PROC=$(ps -ef | wc -l)
USER_PROC=$(ps -o pid 2>/dev/null | wc -l)

echo "TASK METRICS:"
echo "........................................................"
echo "  ↳ TOTAL SYSTEM PROCESSES : ${TOTAL_PROC}"
echo "  ↳ CURRENT OPERATOR TASKS : ${USER_PROC}"
echo "........................................................"
echo "--------------------------------------------------------"
sleep 0.4

# Passo 2: O Top 10 Consumo (Mapeamento Cirúrgico via PS)
echo -e "${CIANO}• [MODULE // COMPUTE_METRICS] Extracting top 10 resources consumers...${SEM_COR}"
sleep 0.8
echo -e "${VERDE}PID      USER        %CPU     %MEM     COMMAND${SEM_COR}"
echo "........................................................"

# EXECUÇÃO DO PS: 
# -eo seleciona as colunas exatas
# --sort=-%cpu ordena pelos maiores consumidores de CPU primeiro
# head -n 11 pega o cabeçalho + os 10 primeiros
# awk formata o espaçamento para ficar alinhado no terminal
ps -eo pid,user,%cpu,%mem,comm --sort=-%cpu | grep -v 'PID' | head -n 10 | awk '{printf "  %-7s %-11s %-8s %-8s %s\n", $1, $2, $3"%", $4"%", $5}'

echo "........................................................"
echo "--------------------------------------------------------"

# Finalização
echo -e "${VERDE}✅ [STDOUT // SUCCESS] Process vector mapping completed.${SEM_COR}"
echo "• Thread scheduler state: BALANCED"
echo "--------------------------------------------------------"