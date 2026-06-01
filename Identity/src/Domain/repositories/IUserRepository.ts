import { User } from "../entities/User";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    
    
    save(user: User, passwordHash: string): Promise<void>; 
    
    findById(id: string): Promise<User | null>;
}