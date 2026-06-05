import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CriarEventoUseCase } from '../../../Usecases/criar/CriarEventoUseCase';
import { IrepositorioEvento } from '../../../Domain/repositories/IRepositorioEvento';

describe('CriarEventoUseCase', () => {
    let repo: IrepositorioEvento;
    let sut: CriarEventoUseCase;

    beforeEach(() => {
        repo = {
            salvar: vi.fn(),
            listarTodos: vi.fn(),
            buscarPorId: vi.fn(),
        };
        sut = new CriarEventoUseCase(repo);
    });

    it('deve criar um evento v?lido com data futura com sucesso', async () => {
        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 7);
        
        const entrada = {
            nome: 'Evento de Teste',
            data: dataFutura.toISOString(),
            estoqueTotal: 100
        };

        const resultado = await sut.execute(entrada);

        expect(resultado).toHaveProperty('id');
        expect(resultado.nome).toBe(entrada.nome);
        expect(repo.salvar).toHaveBeenCalled();
    });

    it('n?o deve permitir criar um evento com data no passado', async () => {
        const dataPassada = new Date();
        dataPassada.setDate(dataPassada.getDate() - 1);

        const entrada = {
            nome: 'Evento Passado',
            data: dataPassada.toISOString(),
            estoqueTotal: 100
        };

        await expect(sut.execute(entrada)).rejects.toThrow('Data invalida');
    });

    it('n?o deve permitir criar um evento com estoque negativo', async () => {
        const dataFutura = new Date();
        dataFutura.setDate(dataFutura.getDate() + 1);

        const entrada = {
            nome: 'Evento Estoque Negativo',
            data: dataFutura.toISOString(),
            estoqueTotal: -10
        };

        await expect(sut.execute(entrada)).rejects.toThrow();
    });
});
