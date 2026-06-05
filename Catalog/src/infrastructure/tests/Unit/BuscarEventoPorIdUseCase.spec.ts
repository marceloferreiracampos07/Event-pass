import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BuscarEventoPorIdUseCase } from '../../../Usecases/buscar/BuscarEventoPorIdUseCase';
import { IrepositorioEvento } from '../../../Domain/repositories/IRepositorioEvento';
import { Evento } from '../../../Domain/entities/Evento';

describe('BuscarEventoPorIdUseCase', () => {
    let repo: IrepositorioEvento;
    let sut: BuscarEventoPorIdUseCase;

    beforeEach(() => {
        repo = {
            salvar: vi.fn(),
            listarTodos: vi.fn(),
            buscarPorId: vi.fn(),
        };
        sut = new BuscarEventoPorIdUseCase(repo);
    });

    it('deve retornar um evento quando encontrado', async () => {
        const evento = new Evento('id-1', 'Evento 1', new Date(), 100, 100);
        vi.mocked(repo.buscarPorId).mockResolvedValue(evento);

        const resultado = await sut.execute({ id: 'id-1' });

        expect(resultado?.id).toBe('id-1');
        expect(repo.buscarPorId).toHaveBeenCalledWith('id-1');
    });

    it('deve lan?ar erro quando o evento n?o for encontrado', async () => {
        vi.mocked(repo.buscarPorId).mockResolvedValue(null);

        await expect(sut.execute({ id: 'any-id' })).rejects.toThrow('Evento nao encontrado');
    });
});
