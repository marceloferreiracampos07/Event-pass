import { IPasswordHasher } from "../../Domain/service/IPasswordHasher";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { LoginUserInputDto, LoginUserOutputDto } from "../DTO/LoginUser.dto";

export class LoginUsecase {
    constructor(
        private useRepository: IUserRepository,
        private passwordhash: IPasswordHasher,
    ) {}

    async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {
        const loginUser = await this.useRepository.findByEmail(input.email);

        if (!loginUser) {
            throw new Error("E-mail ou senha incorretos");
        }

        const isPasswordValid = await this.passwordhash.compare(
            input.password,
            (loginUser as any).passwordHash || ""
        );

        if (!isPasswordValid) {
            throw new Error("E-mail ou senha incorretos");
        }

        return {
            id: loginUser.Id,
            name: loginUser.name,
            email: loginUser.email
        };
    }
}