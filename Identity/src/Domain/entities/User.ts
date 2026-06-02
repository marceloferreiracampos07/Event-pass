export type PapelUsuario = "ADMIN" | "CUSTOMER";

export class Usuario {
    constructor(
        public readonly id: string,
        public nome: string,
        public email: string,
        public papel: PapelUsuario,
        public criadoEm: Date,
        public senha?: string
    ) {
        this.validar();
    }

    private validar(): void {
        if (!this.nome || this.nome.trim().length === 0) {
            throw new Error("O nome não pode ser vazio, preencha por gentileza");
        }

        if (this.nome.trim().length < 3) {
            throw new Error("O nome não pode ter menos de 3 caracteres");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            throw new Error("O e-mail não possui um formato válido");
        }
    }
}
