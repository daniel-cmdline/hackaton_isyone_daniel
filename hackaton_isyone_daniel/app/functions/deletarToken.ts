export const deletarToken = async (
  tokenString: string,
  onSuccess: () => Promise<void>,
) => {
  try {
    const res = await fetch(`/api/tokens?token=${tokenString}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.success) await onSuccess();
  } catch (err) {
    console.error(err);
  }
};
