export class Evento {
    constructor(
        public readonly id: string,
        public nome: string,
        public data: Date,
        public estoqueTotal: number,
        public estoqueDisponivel: number
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

        if (this.estoqueDisponivel < 0) {
            throw new Error("O estoque disponível do evento não pode ser negativo");
        }

        if (this.estoqueDisponivel > this.estoqueTotal) {
            throw new Error("O estoque disponível não pode ser maior que o estoque total");
        }
    }

    
    public baixarEstoque(quantidade: number): void {
        if (quantidade <= 0) {
            throw new Error("A quantidade a ser baixada deve ser maior que zero");
        }

        if (this.estoqueDisponivel - quantidade < 0) {
            throw new Error("Ingressos esgotados para este evento");
        }

        this.estoqueDisponivel -= quantidade;
    }
}

