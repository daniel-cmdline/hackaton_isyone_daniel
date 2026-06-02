#!/bin/sh
echo "=== VERIFICAÇÃO DE DISCO E MEMÓRIA ==="
echo "--- Uso de Disco ---"
df -h | grep -E '^/dev/' || df -h
echo "\n--- Uso de Memória ---"
free -m || echo "Memória: Comando 'free' indisponível neste ambiente."
echo "====================================="