export const dispararScript = async (
  scriptName: string,
  tokenAtivo: string,
  userName: string,
  setLoading: (loading: boolean) => void,
  setOutput: (output: string) => void,
  onLogsUpdate: () => void,
) => {
  if (!tokenAtivo) return;
  setLoading(true);

  // Feedback imediato no terminal antes mesmo da rede responder
  const feedbackInicial = `> INJECTING PAYLOAD: ${scriptName}\n> AUTH_HEADER: X-Isy-Token = ${tokenAtivo.substring(0, 12)}********\n> DISPATCHING TO KERNEL...\n------------------------------------------------------\n`;
  setOutput(feedbackInicial + `\n⏳ Aguardando retorno de stdout...\n`);

  try {
    const res = await fetch("/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Isy-Token": tokenAtivo,
      },
      body: JSON.stringify({
        scriptName,
        args: ["--interface-web", userName],
      }),
    });
    if (!res.ok) {
      setLoading(false);
      setOutput(
        feedbackInicial +
          `[ERRO HTTP] Falha na comunicação com o servidor (Status: ${res.status})`,
      );
      return;
    }
    const data = await res.json();
    setOutput(
      feedbackInicial + (data.success ? data.output : `[ERRO] ${data.error}`),
    );
    onLogsUpdate();
  } catch (err: any) {
    setOutput(feedbackInicial + `[ERRO DE REDE] ${err.message}`);
  } finally {
    setLoading(false);
  }
};
