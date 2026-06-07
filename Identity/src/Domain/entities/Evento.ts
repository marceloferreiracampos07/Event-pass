export class Evento {
    constructor(
        public readonly id: string,
        public nome: string,
        public data: Date
    ) {
        this.validar();
    }

    private validar(): void {
        if (this.data < new Date()) {
            throw new Error("A data do evento não pode ser no passado."); // Will be handled by the UseCase
        }
    }
}
