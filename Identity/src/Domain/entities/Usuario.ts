export type PapelUsuario = "ADMIN" | "CUSTOMER";

export class Usuario {
    private _senha?: string;

    constructor(
        public readonly id: string,
        public readonly nome: string,
        public readonly email: string,
        public readonly papel: PapelUsuario,
        public readonly criadoEm: Date,
        senha?: string
    ) {
        this.validar();
        this._senha = senha;
    }

    get senha(): string | undefined {
        return this._senha;
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
