#!/bin/bash

WEBHOOK_URL="${DISCORD_WEBHOOK_URL}"

# Se a URL não existir, sai silenciosamente para não quebrar a rota
if [ -z "$WEBHOOK_URL" ]; then
    echo "[DISCORD-WARN] DISCORD_WEBHOOK_URL não configurada no ambiente."
    exit 0
fi

SCRIPT_NAME=$1
STATUS=$2
OPERATOR=$3
RAW_OUTPUT=$4

# 🟢 Ajuste de cor e ícone por status
if [ "$STATUS" == "SUCCESS" ]; then
    COLOR=3066993
    EMOJI="✅"
else
    COLOR=15158332
    EMOJI="🚨"
fi

# ✂️ Limita o output do terminal a 500 caracteres para não quebrar o limite do JSON do Discord
TRUNCATED_OUTPUT=$(echo "$RAW_OUTPUT" | head -c 500)

# 🧼 SANITIZAÇÃO ULTRA: Escapa aspas duplas e quebras de linha para o JSON não quebrar de jeito nenhum
CLEAN_OUTPUT=$(echo "$TRUNCATED_OUTPUT" | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

# 📝 Montagem do Payload rico (Embed)
JSON_PAYLOAD=$(cat <<EOF
{
  "embeds": [
    {
      "title": "${EMOJI} Execução de Automação Core",
      "description": "Um script foi disparado no container através do painel central Isyone.",
      "color": ${COLOR},
      "fields": [
        { "name": "Script", "value": "\`$SCRIPT_NAME\`", "inline": true },
        { "name": "Status", "value": "**$STATUS**", "inline": true },
        { "name": "Operador", "value": "$OPERATOR", "inline": false },
        { "name": "Live Terminal Output", "value": "\`\`\`bash\n${CLEAN_OUTPUT}\n\`\`\`", "inline": false }
      ],
      "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
      "footer": { "text": "Isyone Ops Agent v1.0" }
    }
  ]
}
EOF
)

# Dispara contra o Webhook do Discord
curl -s -H "Content-Type: application/json" \
     -X POST \
     -d "$JSON_PAYLOAD" \
     "$WEBHOOK_URL" > /dev/null