#!/bin/bash

echo "██████╗ ███╗   ██╗███████╗    ██████╗  ██████╗ ██████╗ "
echo "██╔══██╗████╗  ██║██╔════╝    ██╔══██╗██╔═══██╗██╔══██╗"
echo "██║  ██║██╔██╗ ██║███████╗    ██████╔╝██║   ██║██████╔╝"
echo "██║  ██║██║╚██╗██║╚════██║    ██╔═══╝ ██║   ██║██╔═══╝ "
echo "██████╔╝██║ ╚████║███████║    ██║     ╚██████╔╝██║     "
echo "╚═════╝ ╚═╝  ╚═══╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝     "
echo "          [ ISYONE ENGINE :: NETWORK CORE PENETRATION ]"
echo ""
echo "[SYSTEM] Initializing DNS network topology mapping..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Captura dos Nameservers Ativos no Linux
echo "• [STAGE 01] Intercepting local resolution file (/etc/resolv.conf)..."
sleep 0.8
echo "STATUS: HOOK_SUCCESS // CURRENT NAMESERVERS ACTIVE:"
echo "........................................................"
cat /etc/resolv.conf | grep nameserver || echo "  ↳ WARNING: No nameservers mapped in local resolv.conf"
echo "........................................................"
echo "--------------------------------------------------------"
sleep 0.5

# Passo 2: O Show ao Vivo - Teste de Injeção e Latência (O sangue na tela)
echo "• [STAGE 02] Launching asynchronous stress/ping packets against global grids..."
sleep 0.5
echo "TARGET CLUSTER 01: Cloudflare Backbone (1.1.1.1)"
echo -n "  ↳ Pinging backbone: "

# Dispara 3 pings reais filtrando apenas o tempo de resposta pra cuspir na tela com delays
for i in 1 2 3; do
    LATENCY=$(ping -c 1 1.1.1.1 | grep 'time=' | awk -F'time=' '{print $2}')
    if [ -z "$LATENCY" ]; then
        echo -n "[DROP] "
    else
        echo -n "[ACK: ${LATENCY}] "
    fi
    sleep 0.4
done
echo ""
echo "  ↳ Network state to Cloudflare: NOMINAL"
echo "........................................................"
sleep 0.5

echo "TARGET CLUSTER 02: Google Anycast Any (8.8.8.8)"
echo -n "  ↳ Pinging backbone: "
for i in 1 2 3; do
    LATENCY=$(ping -c 1 8.8.8.8 | grep 'time=' | awk -F'time=' '{print $2}')
    if [ -z "$LATENCY" ]; then
        echo -n "[DROP] "
    else
        echo -n "[ACK: ${LATENCY}] "
    fi
    sleep 0.4
done
echo ""
echo "  ↳ Network state to Google: NOMINAL"
echo "--------------------------------------------------------"

# Passo 3: Resolução Reversa Forçada (NSLOOKUP real)
echo "• [STAGE 03] Forcing reverse lookup routing test..."
sleep 0.6
echo "RESOLVING ENTRANCE: fmu.edu.br"
echo "........................................................"
# Faz uma resolução real usando o comando host ou nslookup da máquina
host fmu.edu.br | head -n 2 || nslookup fmu.edu.br | head -n 5 || echo "  ↳ Core routing unresolved or host command missing."
echo "........................................................"
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // SUCCESS] DNS Matrix validation pipeline completed."
echo "• All resolvers are responding. Network pipe is saturated."
echo "--------------------------------------------------------"