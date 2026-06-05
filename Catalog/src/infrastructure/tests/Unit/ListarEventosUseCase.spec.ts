import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ListarEventosUseCase } from '../../../Usecases/listar/ListarEventosUseCase';
import { IrepositorioEvento } from '../../../Domain/repositories/IRepositorioEvento';
import { Evento } from '../../../Domain/entities/Evento';

describe('ListarEventosUseCase', () => {
    let repo: IrepositorioEvento;
    let sut: ListarEventosUseCase;

    beforeEach(() => {
        repo = {
            salvar: vi.fn(),
            listarTodos: vi.fn(),
            buscarPorId: vi.fn(),
        };
        sut = new ListarEventosUseCase(repo);
    });

    it('deve retornar uma lista de eventos', async () => {
        const eventos = [
            new Evento('1', 'Evento 1', new Date(), 10, 10),
            new Evento('2', 'Evento 2', new Date(), 20, 20),
        ];
        vi.mocked(repo.listarTodos).mockResolvedValue(eventos);

        const resultado = await sut.execute();

        expect(resultado).toHaveLength(2);
        expect(resultado[0].nome).toBe('Evento 1');
    });

    it('deve retornar lista vazia se não houver eventos', async () => {
        vi.mocked(repo.listarTodos).mockResolvedValue([]);

        const resultado = await sut.execute();

        expect(resultado).toHaveLength(0);
    });
});
