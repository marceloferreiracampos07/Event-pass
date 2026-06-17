export class Evento {
    constructor(
        public readonly id: string,
        public nome: string,
        public data: Date,
        public readonly estoqueTotal: number
    ) {
    
        this.validar();
    }

    private validar(): void {
        if (!this.nome || this.nome.trim().length < 3) {
            throw new Error("O nome do evento deve ter pelo menos 3 caracteres");
        }

        if (this.estoqueTotal < 0) {
            throw new Error("O estoque total do evento não pode ser negativo");
        }

        if (this.data.getTime() < new Date().getTime()) {
            throw new Error("A data do evento não pode ser no passado");
        }
    }
}
