import { IPasswordHasher } from "../../Domain/service/IPasswordHasher";
import { IRepositorioUsuario } from "../../Domain/repositories/IUserRepository";
import { LoginUserInputDto, LoginUserOutputDto } from "../DTO/LoginUser.dto";
import { CredenciaisInvalidasError } from "../../Domain/errors/DomainError";

export class LoginUsecase {
    constructor(
        private repositorioUsuario: IRepositorioUsuario,
        private hasherSenha: IPasswordHasher,
    ) {}

    async executar(entrada: LoginUserInputDto): Promise<LoginUserOutputDto> {
        const usuario = await this.repositorioUsuario.buscarPorEmail(entrada.email);

        if (!usuario) {
            throw new CredenciaisInvalidasError();
        }

        const senhaEhValida = await this.hasherSenha.compare(
            entrada.password,
            usuario.senha ?? ""
        );

        if (!senhaEhValida) {
            throw new CredenciaisInvalidasError();
        }

        return {
            id: usuario.id,
            name: usuario.nome,
            email: usuario.email
        };
    }
}
