import { Usuario } from "../../Domain/entities/Usuario";
import { IRepositorioUsuario } from "../../Domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../Domain/service/IPasswordHasher";
import { RegisterUserInputDto, RegisterUserOutputDto } from "../DTO/RegisterUser.dto";
import { EmailJaCadastradoError } from "../../Domain/errors/DomainError";
import crypto from "crypto";

export class RegisterUseCase {
    constructor(
        private repositorioUsuario: IRepositorioUsuario,
        private hasherSenha: IPasswordHasher,
    ) {}

    async executar(entrada: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
        const usuarioExistente = await this.repositorioUsuario.buscarPorEmail(entrada.email);

        if (usuarioExistente) {
            throw new EmailJaCadastradoError();
        }

        const senhaHasheada = await this.hasherSenha.hash(entrada.password);

        const novoUsuario = new Usuario(
            crypto.randomUUID(),
            entrada.name,
            entrada.email,
            entrada.role,
            new Date(),
            senhaHasheada
        );

        await this.repositorioUsuario.salvar(novoUsuario, senhaHasheada);

        return {
            id: novoUsuario.id,
            name: novoUsuario.nome,
            email: novoUsuario.email
        };
    }
}
