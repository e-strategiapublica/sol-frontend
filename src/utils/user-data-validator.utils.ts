export default class UserDataValidator {
  static validarCNPJ(cnpj: string): boolean {
    if (!cnpj || typeof cnpj !== 'string') return false;
    cnpj = cnpj.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    // Aceita 14 caracteres alfanuméricos
    if (!/^[A-Z0-9]{14}$/.test(cnpj)) return false;
    if (/^(\w)\1+$/.test(cnpj)) return false; // todos iguais

    // Função para converter caractere para valor numérico
    function charToValue(char: string): number {
      if (/[0-9]/.test(char)) return parseInt(char, 10);
      return char.charCodeAt(0) - 48;
    }
    const base = cnpj.substring(0, 12);
    const dv1Input = base.split('').map(charToValue);
    let sum1 = 0;
    let weight = 2;
    for (let i = dv1Input.length - 1; i >= 0; i--) {
      sum1 += dv1Input[i] * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let rest1 = sum1 % 11;
    let dv1 = rest1 < 2 ? 0 : 11 - rest1;
    const dv2Input = [...dv1Input, dv1];
    let sum2 = 0;
    weight = 2;
    for (let i = dv2Input.length - 1; i >= 0; i--) {
      sum2 += dv2Input[i] * weight;
      weight = weight === 9 ? 2 : weight + 1;
    }
    let rest2 = sum2 % 11;
    let dv2 = rest2 < 2 ? 0 : 11 - rest2;
    const dvInformado = cnpj.substring(12);
    return dvInformado === `${dv1}${dv2}`;
  }
}