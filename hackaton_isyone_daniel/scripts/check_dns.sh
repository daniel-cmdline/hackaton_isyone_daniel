#!/bin/bash
echo "[*] Analisando servidores de resolução (DNS)..."
cat /etc/resolv.conf | grep nameserver
