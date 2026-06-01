import { User } from "../../Domain/entities/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../Domain/service/IPasswordHasher";
import { RegisterUserInputDto, RegisterUserOutputDto } from "../DTO/RegisterUser.dto";

export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordhash: IPasswordHasher,
    ) {}
    
    async execute(input: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
        

        const existingUser = await this.userRepository.findByEmail(input.email);

        if (existingUser) {
            throw new Error("Já existe um usuário com esse email no sistema");
        }

    
        const user = new User(
            crypto.randomUUID(),
            input.name,
            input.email,
            input.role,
            new Date()
        );

    
        const hashedpassword = await this.passwordhash.hash(input.password);

        
        await this.userRepository.save(user, hashedpassword);

    
        return {
            id: user.Id,
            name: user.name,
            email: user.email
        };
    }
}