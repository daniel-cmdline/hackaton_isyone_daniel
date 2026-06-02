export const gerarNovoIsyToken = async (
  tokensLength: number,
  setNovoTokenGerado: (token: string) => void,
  onSuccess: () => Promise<void>,
) => {
  try {
    const nomeToken = `Chave_Ops_${tokensLength + 1}`;
    const res = await fetch("/api/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nomeToken }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setNovoTokenGerado(data.data.token);
        await onSuccess();
      }
    }
  } catch (err) {
    console.error(err);
  }
};
