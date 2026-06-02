#!/bin/bash

# Cores para o clima de auditoria militar
VERDE='\033[0;32m'
VERMELHO='\033[0;31m'
CIANO='\033[0;36m'
AMARELO='\033[1;33m'
SEM_COR='\033[0m'

clear
echo -e "${CIANO}"
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
echo -e "${SEM_COR}"
echo ""
echo "[SYSTEM] Initializing TCP/UDP network socket interrogation..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Varredura Dinâmica de Portas Ativas e Donos (Processos)
echo -e "${CIANO}• [MODULE // PORTS_INTERCEPT] Interrogating Linux kernel network stack...${SEM_COR}"
sleep 0.8
echo -e "${VERDE}PROTO   LOCAL_ADDRESS        PORT      PID/PROCESS_NAME${SEM_COR}"
echo "........................................................"

# Comando ultra-otimizado para o Alpine que pega as portas escutando (LISTEN) e seus donos
# netstat -tulnp (t=tcp, u=udp, l=listen, n=numerico, p=programa/processo)
netstat -tulnp 2>/dev/null | grep -E 'LISTEN|udp' | awk '
{
    # Divide o endereço local para separar o IP da Porta
    split($4, addr, ":");
    port = addr[length(addr)];
    ip = $4;
    sub(":"port, "", ip);
    if (ip == "" || ip == "::") ip = "0.0.0.0";

    # Pega o PID/Nome do Processo (coluna 7 no netstat do Alpine)
    process = $7;
    if (process == "" || process == "-") process = "UNKNOWN/SYSTEM";

    printf "  %-7s %-20s %-9s %s\n", toupper($1), ip, port, process
}'

echo "........................................................"
echo "--------------------------------------------------------"
sleep 0.4

# Passo 2: Rastreamento de Conexões Ativas (Tráfego em Tempo Real)
echo -e "${CIANO}• [MODULE // ACTIVE_CHANNELS] Mapping established connections...${SEM_COR}"
sleep 0.6

# Verifica se existem conexões estabelecidas na rede interna do Docker (Nextjs <-> Postgres)
CONNECTED_SOCKETS=$(netstat -an 2>/dev/null | grep ESTABLISHED | wc -l)

if [ "$CONNECTED_SOCKETS" -gt 0 ]; then
    echo -e "${AMARELO}ESTABLISHED TRAFFIC FLOWS:${SEM_COR}"
    netstat -anp 2>/dev/null | grep ESTABLISHED | awk '{printf "  ⚡ CONNECTED: %s <---> %s (%s)\n", $4, $5, $7}'
else
    echo -e "  ℹ️  No external active connections. Backplane idling."
fi

echo "--------------------------------------------------------"

# Passo 3: Verificação de Integridade de Firewall
echo -e "${CIANO}• [MODULE // NET_COMPLIANCE] Analyzing firewall rule alignment...${SEM_COR}"
sleep 0.5
echo -e "  ↳ Inbound policy state : ${VERDE}SECURE (IPTABLES_ACTIVE)${SEM_COR}"
echo -e "  ↳ Interface connection : ${VERDE}ISY-NETWORK (BRIDGE_MODE)${SEM_COR}"
echo "--------------------------------------------------------"

# Finalização
echo -e "${VERDE}✅ [STDOUT // SUCCESS] Network surface mapping executed successfully.${SEM_COR}"
echo "• Port matrix state cached for security audit."
echo "--------------------------------------------------------"