export default class DocumentUtil {
    static formatDocument(value: string) {
        if (!value) return '';
        // CPF
        if (value.length === 11 && /^\d+$/.test(value)) {
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        }
        // CNPJ antigo (apenas números)
        if (value.length === 14 && /^\d+$/.test(value)) {
            return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        }
        // CNPJ novo (alfanumérico: 12 letras/números + 2 dígitos)
        if (value.length === 14 && /^[A-Z0-9]{12}\d{2}$/i.test(value)) {
            // Exemplo visual: 7C.GDW.INC/SLG8-77
            return value.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, "$1.$2.$3/$4-$5");
        }
        return value;
    }
}