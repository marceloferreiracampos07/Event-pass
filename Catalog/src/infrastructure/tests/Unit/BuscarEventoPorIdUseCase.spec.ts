import { describe, it, expect, vi, beforeEach } from "vitest";
import { BuscarEventoPorIdUseCase } from "../../../Usecases/buscar/BuscarEventoPorIdUseCase";
import { IrepositorioEvento } from "../../../Domain/repositories/IRepositorioEvento";
import { Evento } from "../../../Domain/entities/Evento";

describe("BuscarEventoPorIdUseCase (Testes UnitÃ¡rios)", () => {
    let repositorioMock: IrepositorioEvento;
    let sut: BuscarEventoPorIdUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        repositorioMock = {
            buscarPorId: vi.fn(),
        } as unknown as IrepositorioEvento;

        sut = new BuscarEventoPorIdUseCase(repositorioMock);
    });

    it("deve retornar os dados formatados do evento quando o ID existir", async () => {
        
        const ID_VALIDO_CADASTRADO = "evento-uuid-valido";
        const dataAmanha = new Date();
        dataAmanha.setDate(dataAmanha.getDate() + 1);

        const eventoExistenteNoBanco = new Evento(
            ID_VALIDO_CADASTRADO,
            "Grande Show de Rock",
            dataAmanha,
            100,
            100
        );

        vi.spyOn(repositorioMock, "buscarPorId").mockResolvedValue(eventoExistenteNoBanco);

        
        const eventoMapeado = await sut.execute({ id: ID_VALIDO_CADASTRADO });

        
        expect(eventoMapeado).not.toBeNull();
        expect(eventoMapeado?.id).toBe(ID_VALIDO_CADASTRADO);
        expect(eventoMapeado?.nome).toBe(eventoExistenteNoBanco.nome);
        expect(repositorioMock.buscarPorId).toHaveBeenCalledWith(ID_VALIDO_CADASTRADO);
        expect(repositorioMock.buscarPorId).toHaveBeenCalledTimes(1);
    });

    it("deve disparar uma exceÃ§Ã£o se o evento nÃ£o for localizado no repositÃ³rio", async () => {
        
        const ID_INEXISTENTE = "id-nao-cadastrado";
        
        vi.spyOn(repositorioMock, "buscarPorId").mockResolvedValue(null);

        
        await expect(sut.execute({ id: ID_INEXISTENTE }))
            .rejects
            .toThrow("Evento nÃ£o encontrado");

        expect(repositorioMock.buscarPorId).toHaveBeenCalledWith(ID_INEXISTENTE);
    });
});
