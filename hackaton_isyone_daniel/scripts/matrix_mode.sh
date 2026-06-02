#!/bin/bash
echo "[!] INICIANDO DESCRIPTOGRAFIA DE DADOS..."
sleep 1
# Pega caracteres aleatórios, formata em colunas e imprime 30 linhas para não travar a API
cat /dev/urandom | tr -dc 'a-zA-Z0-9!@#$%^&*()' | fold -w 80 | head -n 30
echo ""
echo "[+] ACESSO CONCEDIDO."
