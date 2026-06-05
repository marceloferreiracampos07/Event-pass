import { Usuario } from "../../Domain/entities/User";
import { IRepositorioUsuario } from "../../Domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../Domain/service/IPasswordHasher";
import { RegisterUserInputDto, RegisterUserOutputDto } from "../DTO/RegisterUser.dto";
import crypto from "crypto";

export class RegisterUseCase {
    constructor(
        private repositorioUsuario: IRepositorioUsuario,
        private hasherSenha: IPasswordHasher,
    ) {}

    async executar(entrada: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
        const usuarioExistente = await this.repositorioUsuario.buscarPorEmail(entrada.email);

        if (usuarioExistente) {
            throw new Error("Já existe um usuário com esse e-mail no sistema");
        }

        const novoUsuario = new Usuario(
            crypto.randomUUID(),
            entrada.name,
            entrada.email,
            entrada.role,
            new Date()
        );

        const senhaHasheada = await this.hasherSenha.hash(entrada.password);

        await this.repositorioUsuario.salvar(novoUsuario, senhaHasheada);

        return {
            id: novoUsuario.id,
            name: novoUsuario.nome,
            email: novoUsuario.email
        };
    }
}
