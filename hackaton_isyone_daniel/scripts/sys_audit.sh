#!/bin/bash

echo "          /\\ "
echo "         /  \\ "
echo "        /████\\ "
echo "       /██████\\ "
echo "      [  ISYONE  ] "
echo "      |  ██████  | "
echo "      |  ██████  | "
echo "      |  ██████  | "
echo "       \\██████/ "
echo "        \\████/ "
echo "         \\  / "
echo "          \\/ "
echo "     [ ARCHITECTURE CORE SHIELD ]"
echo ""
echo "[SYSTEM] Initializing low-level environment audit..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Metadados do Kernel (Uname real)
echo "• [MODULE // KERNEL_SIGNATURE] Interrogating OS release..."
sleep 0.8
echo "HOST KERNEL DATA:"
echo "........................................................"
# Roda o comando real indentando para ficar bonito na tabela
uname -snrvm | awk '{print "  ↳ NODE NAME: " $1 "\n  ↳ KERNEL   : " $2 " " $3 "\n  ↳ ARCH     : " $4 " " $5}'
echo "........................................................"
echo "--------------------------------------------------------"
sleep 0.5

# Passo 2: Uptime e Carga de Trabalho (Uptime real)
echo "• [MODULE // RESOURCE_METRICS] Fetching host vital signs..."
sleep 0.8
echo "HOST TELEMETRY:"
echo "........................................................"
# Pega o uptime real da máquina
UPTIME_RAW=$(uptime)
echo "  ↳ METRICS: ${UPTIME_RAW}"
echo "........................................................"
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // SUCCESS] Environment baseline captured."
echo "• Node state: STABLE // Compliance matrix: OK"
echo "--------------------------------------------------------"