#!/bin/bash
echo "[*] Portas TCP abertas escutando na máquina atual:"
# Funciona muito bem no Linux/Docker para ver o que está rodando
netstat -tuln | grep LISTEN || ss -tuln
