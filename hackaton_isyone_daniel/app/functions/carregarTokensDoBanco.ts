export const carregarTokensDoBanco = async (
  setTokens: (tokens: any[]) => void,
  setTokenAtivo: (token: string) => void,
) => {
  try {
    const res = await fetch("/api/tokens", { method: "GET" });
    if (!res.ok) return;
    const data = await res.json();

    if (data.success) {
      if (data.data && data.data.length > 0) {
        setTokens(data.data);
        setTokenAtivo(data.data[0].token);
      } else {
        setTokens([]);
        setTokenAtivo("");
      }
    }
  } catch (err) {
    console.error(err);
  }
};
