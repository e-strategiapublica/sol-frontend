// Utilitário para calcular SHA256 usando a API nativa do navegador
// Uso: await sha256('texto') => retorna o hash em hexadecimal

export async function sha256(message: string): Promise<string> {
  // Codifica a string em um ArrayBuffer
  const msgBuffer = new TextEncoder().encode(message);
  // Calcula o hash
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  // Converte para array de bytes
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Converte bytes para hexadecimal
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
