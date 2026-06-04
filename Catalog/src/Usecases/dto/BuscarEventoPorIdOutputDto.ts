export interface BuscarEventoPorIdOutputDto {
    id: string;
    nome: string;
    data: Date;
    estoqueTotal: number;
    estoqueDisponivel: number;
}