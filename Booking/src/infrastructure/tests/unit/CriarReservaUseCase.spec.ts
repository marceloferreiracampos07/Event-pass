import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CriarReservaUseCase } from '../../../application/useCases/create-booking/CriarReservaUseCase';
import { IReservaRepository } from '../../../Domain/repositories/IReservaRepository';
import { IEventService } from '../../../Domain/services/IEventService';
import { IEventBroadcaster } from '../../../Domain/Broadcast/IEventBroadcaster';

describe('Caso de Uso CriarReserva', () => {
  let repositorioReserva: IReservaRepository;
  let servicoEvento: IEventService;
  let transmissorEvento: IEventBroadcaster;
  let sut: CriarReservaUseCase;

  beforeEach(() => {
    repositorioReserva = {
      criar: vi.fn().mockImplementation((r) => Promise.resolve({ ...r, id: 1 })),
      buscarPorId: vi.fn(),
      atualizarStatus: vi.fn(),
      buscarPorUsuarioId: vi.fn(),
    };
    servicoEvento = {
      verificarDisponibilidade: vi.fn().mockResolvedValue(true),
    };
    transmissorEvento = {
      publish: vi.fn().mockResolvedValue(undefined),
    };
    sut = new CriarReservaUseCase(repositorioReserva, servicoEvento, transmissorEvento);
  });

  it('deve criar uma reserva com sucesso', async () => {
    const entrada = {
      eventoId: 1,
      usuarioId: 1,
      quantidadeIngressos: 2,
      tipoIngresso: 'VIP',
      setor: 'Setor A',
    };

    const resultado = await sut.executar(entrada);

    expect(resultado.id).toBe(1);
    expect(repositorioReserva.criar).toHaveBeenCalled();
    expect(transmissorEvento.publish).toHaveBeenCalled();
  });

  it('deve lançar erro se não houver ingressos', async () => {
    vi.spyOn(servicoEvento, 'verificarDisponibilidade').mockResolvedValue(false);

    const entrada = {
      eventoId: 1,
      usuarioId: 1,
      quantidadeIngressos: 2,
      tipoIngresso: 'VIP',
      setor: 'Setor A',
    };

    await expect(sut.executar(entrada)).rejects.toThrow('Não há ingressos disponíveis');
  });
});
