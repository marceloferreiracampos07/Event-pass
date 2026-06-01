import { prisma } from "./prisma"; 
import { User, UserRole } from "../../Domain/entities/User";
import { IUserRepository } from "../../Domain/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
    
    async findByEmail(email: string): Promise<User | null> {
        try {
            const prismaUser = await prisma.user.findUnique({ where: { email } });
            
            if (!prismaUser) {
                return null;
            }
            
            return new User(
                prismaUser.id,
                prismaUser.name,
                prismaUser.email,
                prismaUser.role as UserRole,
                prismaUser.createdAt
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

   async save(user: User, passwordHash: string): Promise<void> {
        try {
            await prisma.user.create({
                data: {
                    id: user.Id,
                    name: user.name,
                    email: user.email,
                    role: user.role as string,
                    
                    accounts: { 
                        create: [
                            {
                                type: "credentials", 
                                provider: "credentials",
                                providerAccountId: user.Id
                            } 
                        ]
                    }
                }
            } as any);
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async findById(id: string): Promise<User | null> {
        try {
            // 🔎 A única mudança real é aqui: trocamos "email" por "id"
            const prismaUser = await prisma.user.findUnique({ where: { id } });
            
            if (!prismaUser) {
                return null;
            }
            
            return new User(
                prismaUser.id,
                prismaUser.name,
                prismaUser.email,
                prismaUser.role as UserRole,
                prismaUser.createdAt
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }
}