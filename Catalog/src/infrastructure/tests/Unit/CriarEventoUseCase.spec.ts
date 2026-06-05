import { describe, it, expect, vi, beforeEach } from "vitest";
import { CriarEventoUseCase } from "../../../Usecases/criar/CriarEventoUseCase";
import { IrepositorioEvento } from "../../../Domain/repositories/IRepositorioEvento";

describe("CriarEventoUseCase (Testes Unitários)", () => {
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

    it("deve criar um evento válido com data futura com sucesso", async () => {
        // Arrange
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);

        const dadosDoNovoEvento = {
            nome: "Workshop de TypeScript",
            data: amanha.toISOString(), 
            estoqueTotal: 50
        };

        // Act - Chamando o método correto da sua classe (.execute)
        const eventoCriado = await sut.executar(dadosDoNovoEvento);

        // Assert
        expect(eventoCriado).toHaveProperty("id");
        expect(eventoCriado.nome).toBe(dadosDoNovoEvento.nome);
        expect(repositorioMock.salvar).toHaveBeenCalledTimes(1);
    });

    it("não deve permitir criar um evento com data no passado", async () => {
        // Arrange
        const ontem = new Date();
        ontem.setDate(ontem.getDate() - 1);

        const dadosInvalidos = {
            nome: "Show Antigo",
            data: ontem.toISOString(), // Blindado
            estoqueTotal: 100
        };

        // Act & Assert
        await expect(sut.executar(dadosInvalidos))
            .rejects
            .toThrow("Não é possível criar um evento com uma data no passado"); 
    });

    it("não deve permitir criar um evento com estoque negativo", async () => {
        // Arrange
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);

        const ESTOQUE_NEGATIVO_INVALIDO = -50;
        const dadosComEstoqueNegativo = {
            nome: "Show Cortado",
            data: amanha.toISOString(),
            estoqueTotal: ESTOQUE_NEGATIVO_INVALIDO
        };

        // Act & Assert
        await expect(sut.executar(dadosComEstoqueNegativo))
            .rejects
            .toThrow("O estoque total do evento não pode ser negativo");
    });
});