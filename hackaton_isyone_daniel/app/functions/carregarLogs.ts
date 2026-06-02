export const carregarLogs = async (
  tokenAtivo: string,
  sistemaNukado: boolean,
  setLogs: (logs: any[]) => void,
) => {
  if (!tokenAtivo || sistemaNukado) return;
  try {
    const res = await fetch("/api/logs", {
      method: "GET",
      headers: { "X-Isy-Token": tokenAtivo },
    });
    if (!res.ok) return;
    const data = await res.json();
    if (data.success) setLogs(data.data);
  } catch (err) {
    console.error(err);
  }
};
