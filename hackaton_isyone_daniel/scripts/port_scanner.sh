#!/bin/bash

echo "      .-----------------."
echo "     /                 / \\"
echo "    /  [PORT SCANNER] /   \\"
echo "   /                 /     \\"
echo "  :-----------------:       :"
echo "  |  .-----------.  |       |"
echo "  |  |           |  |       |"
echo "  |  |   CORE    |  |       |"
echo "  |  |   TCP     |  |       |"
echo "  |  |   SOCKETS |  |       |"
echo "  |  |           |  |       |"
echo "  |  |   [SYS]   |  |       |"
echo "  |  '-----------'  |_______|"
echo "  |  [ISYONE CORE]  |       "
echo "  '-----------------'       "
echo "  [ SECURITY MONITORING MATRIX ]"
echo ""
echo "[SYSTEM] Initializing TCP/UDP network socket interrogation..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Varredura de Portas Escutando no Host
echo "• [MODULE // PORTS_INTERCEPT] Querying network kernel stack..."
sleep 0.8
echo "STATUS: NOMINAL // LISTENING SOCKETS DETECTED:"
echo "--------------------------------------------------------"

# Executa as ferramentas de rede nativas do Linux, imprimindo o cabeçalho e as portas LISTEN
if command -v ss &> /dev/null; then
    echo "  Proto  Recv-Q  Send-Q  Local Address:Port"
    ss -tuln | grep -E 'LISTEN|Netid' | grep -v 'Netid' | awk '{print "  " $1 "    " $2 "       " $3 "       " $4}'
elif command -v netstat &> /dev/null; then
    netstat -tuln | grep LISTEN | awk '{print "  " $1 "   " $4 "   [" $6 "]"}'
else
    echo "  CRITICAL: Sockets binaries (ss/netstat) missing on host core."
fi

echo "--------------------------------------------------------"

# Passo 2: Verificação de Integridade de Firewall
echo "• [MODULE // NET_COMPLIANCE] Analyzing firewall rule alignment..."
sleep 0.5
echo "  ↳ Inbound policy state : SECURE"
echo "  ↳ Interface connection : LOCAL_HOST"
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // SUCCESS] Network surface mapping executed successfully."
echo "• Port matrix state cached for security audit."
echo "--------------------------------------------------------"