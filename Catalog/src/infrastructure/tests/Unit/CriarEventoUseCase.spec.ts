import { describe, it, expect, vi, beforeEach } from "vitest";
import { CriarEventoUseCase } from "../../../Usecases/criar/CriarEventoUseCase";
import { IrepositorioEvento } from "../../../Domain/repositories/IRepositorioEvento";

describe("CriarEventoUseCase (Testes UnitÃ¡rios)", () => {
    let repositorioMock: IrepositorioEvento;
    let sut: CriarEventoUseCase; 

    beforeEach(() => {
        
        vi.clearAllMocks();

        
        repositorioMock = {
            salvar: vi.fn().mockResolvedValue(null),
            listarTodos: vi.fn(),
            buscarPorId: vi.fn(),
        } as unknown as IrepositorioEvento;

        sut = new CriarEventoUseCase(repositorioMock);
    });

    it("deve criar um evento vÃ¡lido com data futura com sucesso", async () => {
        
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);

        const dadosDoNovoEvento = {
            nome: "Workshop de TypeScript",
            data: amanha.toISOString(), 
            estoqueTotal: 50
        };

        
        const eventoCriado = await sut.executar(dadosDoNovoEvento);

        
        expect(eventoCriado).toHaveProperty("id");
        expect(eventoCriado.nome).toBe(dadosDoNovoEvento.nome);
        expect(repositorioMock.salvar).toHaveBeenCalledTimes(1);
    });

    it("nÃ£o deve permitir criar um evento com data no passado", async () => {
        
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);

        const dadosInvalidos = {
            nome: "Show Antigo",
            data: ontem.toISOString(), 
            estoqueTotal: 100
        };

        
        await expect(sut.executar(dadosInvalidos))
            .rejects
            .toThrow("NÃ£o Ã© possÃ­vel criar um evento com uma data no passado"); 
    });

    it("nÃ£o deve permitir criar um evento com estoque negativo", async () => {
        
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);

        const ESTOQUE_NEGATIVO_INVALIDO = -50;
        const dadosComEstoqueNegativo = {
            nome: "Show Cortado",
            data: amanha.toISOString(),
            estoqueTotal: ESTOQUE_NEGATIVO_INVALIDO
        };

        
        await expect(sut.executar(dadosComEstoqueNegativo))
            .rejects
            .toThrow("O estoque total do evento nÃ£o pode ser negativo");
    });
});
