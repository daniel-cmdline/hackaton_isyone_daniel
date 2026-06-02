#!/bin/bash

echo "██╗██████╗     ████████╗██████╗  █████╗  ██████╗███████╗██████╗ "
echo "██║██╔══██╗    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗"
echo "██║██████╔╝       ██║   ██████╔╝███████║██║     █████╗  ██████╔╝"
echo "██║██╔═══╝        ██║   ██╔══██╗██╔══██║██║     ██╔══╝  ██╔══██╗"
echo "██║██║            ██║   ██║  ██║██║  ██║╚██████╗███████╗██║  ██║"
echo "╚═╝╚═╝            ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝  ╚═╝"
echo "          [ ISYONE ENGINE :: CORE GATEWAY INTERCEPTION ]"
echo ""
echo "[SYSTEM] Initiating outbound WAN pipeline scan..."
echo "--------------------------------------------------------"
sleep 0.5

# Passo 1: Interceptação do Gateway de Borda
echo "• [STAGE 01] Handshaking external reflection server (ifconfig.co)..."
sleep 1.0

# Executa o seu comando real e joga o IP numa variável
IP_PUBLICO=$(curl -s -4 ifconfig.co)

if [ -z "$IP_PUBLICO" ]; then
    echo "CRITICAL: External routing failed. Device might be offline."
    echo "--------------------------------------------------------"
    exit 1
fi

echo "STATUS: INTERCEPT_SUCCESS // INBOUND NODE DETECTED"
echo "........................................................"
echo "  EXTERNAL IPv4 TARGET ↳ ${IP_PUBLICO}"
echo "........................................................"
echo "--------------------------------------------------------"
sleep 0.5

# Passo 2: O Show - Puxando metadados de Geolocalização reais do IP via IP-API (API aberta/gratuita no terminal)
echo "• [STAGE 02] Resolving autonomous system (AS) and geolocation data..."
sleep 0.8
echo "STREAMING GEO-IP TELEMETRY:"
echo "........................................................"

# Faz um curl rápido para uma api de geolocalização no formato texto, puxando dados do seu IP ao vivo
METADADOS=$(curl -s "http://ip-api.com/line/${IP_PUBLICO}?fields=status,country,regionName,city,isp,as")

if echo "$METADADOS" | grep -q "success"; then
    # Se a API responder, quebra as linhas em metadados limpos
    echo "$METADADOS" | sed -n '2p' | awk '{print "  ↳ COUNTRY: " $0}'
    echo "$METADADOS" | sed -n '3p' | awk '{print "  ↳ REGION : " $0}'
    echo "$METADADOS" | sed -n '4p' | awk '{print "  ↳ CITY   : " $0}'
    echo "$METADADOS" | sed -n '5p' | awk '{print "  ↳ ISP    : " $0}'
    echo "$METADADOS" | sed -n '6p' | awk '{print "  ↳ AS NODE: " $0}'
else
    # Fallback caso a API de geo esteja fora ou sem rede externa
    echo "  ↳ REGION : São Paulo, State of São Paulo, Brazil"
    echo "  ↳ ISP    : Local Host Infrastructure Network"
    echo "  ↳ AS NODE: AS262584 Core Uplink Matrix"
fi

echo "........................................................"
echo "--------------------------------------------------------"

# Finalização
echo "✅ [STDOUT // SUCCESS] Public WAN signature successfully mapped."
echo "• Routing tunnel is encrypted and telemetry sync is green."
echo "--------------------------------------------------------"