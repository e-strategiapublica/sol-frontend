export default class UserDataValidator {
  static validarCNPJ(cnpj: string): boolean {
 
    if (!cnpj || typeof cnpj !== 'string') return false;
    cnpj = cnpj.replace(/[^A-Z0-9]/gi, '').toUpperCase();

    const regexNovo = /^[A-Z0-9]{12}[0-9]{2}$/;
    const regexAntigo = /^\d{14}$/;

    if (regexNovo.test(cnpj)) {
      // Novo padrão: alfanumérico
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
    } else if (regexAntigo.test(cnpj)) {
      // Antigo: apenas números
      if (/^(\d)\1+$/.test(cnpj)) return false;
      const calcDv = (base: string, pesos: number[]) => {
        let sum = 0;
        for (let i = 0; i < pesos.length; i++) {
          sum += parseInt(base.charAt(i), 10) * pesos[i];
        }
        let rest = sum % 11;
        return rest < 2 ? 0 : 11 - rest;
      };
      const base = cnpj.substring(0, 12);
      const dv1 = calcDv(base, [5,4,3,2,9,8,7,6,5,4,3,2]);
      const dv2 = calcDv(base + dv1, [6,5,4,3,2,9,8,7,6,5,4,3,2]);
      return cnpj.substring(12) === `${dv1}${dv2}`;
    }
    return false;
  }
 
}