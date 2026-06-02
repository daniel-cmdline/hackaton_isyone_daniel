export async function enviarParaDiscord(scriptName: string, status: string, operador: string, output: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[DISCORD-ERR] URL do Webhook não encontrada no .env");
    return;
  }

  const color = status === "SUCCESS" ? 3066993 : 15158332;
  const emoji = status === "SUCCESS" ? "✅" : "🚨";
  
  // Limita e limpa o texto para o JSON do Discord não engasgar
  const cleanOutput = output.substring(0, 500).replace(/\u001b\[\d+m/g, ""); // Remove códigos ANSI de cor que ficam feios no Discord

  const payload = {
    embeds: [{
      title: `${emoji} Execução de Automação Core`,
      description: "Um script foi disparado no container através do painel central Isyone.",
      color: color,
      fields: [
        { name: "Script", value: `\`${scriptName}\``, inline: true },
        { name: "Status", value: `**${status}**`, inline: true },
        { name: "Operador", value: operador, inline: false },
        { name: "Live Terminal Output", value: `\`\`\`bash\n${cleanOutput}\n\`\`\``, inline: false }
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "Isyone Ops Agent v1.0" }
    }]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      console.error(`[DISCORD-ERR] Discord retornou status ${response.status}`);
    }
  } catch (err) {
    console.error("[DISCORD-ERR] Erro ao disparar fetch para o Discord:", err);
  }
}