import { prisma } from "./prisma";
import { Usuario, PapelUsuario } from "../../Domain/entities/Usuario";
import { IRepositorioUsuario } from "../../Domain/repositories/IUserRepository";
import crypto from "crypto";

const PROVIDER_ID = "credentials";

export class PrismaUserRepository implements IRepositorioUsuario {

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        try {
            const usuarioPrisma = await prisma.user.findUnique({
                where: { email },
                include: {
                    accounts: {
                        where: {
                            providerId: PROVIDER_ID
                        }
                    }
                }
            });

            if (!usuarioPrisma) {
                return null;
            }

            return new Usuario(
                usuarioPrisma.id,
                usuarioPrisma.name,
                usuarioPrisma.email,
                usuarioPrisma.role as PapelUsuario,
                usuarioPrisma.createdAt,
                usuarioPrisma.accounts[0]?.password ?? undefined
            );
        } catch (erro: unknown) {
            this.tratarErro("buscar usuário por e-mail", erro);
        }
    }

    async salvar(usuario: Usuario, senhaHash: string): Promise<void> {
        try {
            await prisma.user.create({
                data: {
                    id: usuario.id,
                    name: usuario.nome,
                    email: usuario.email,
                    role: usuario.papel,
                    accounts: {
                        create: {
                            id: crypto.randomUUID(),
                            accountId: usuario.id,
                            providerId: PROVIDER_ID,
                            password: senhaHash
                        }
                    }
                }
            });
        } catch (erro: unknown) {
            this.tratarErro("salvar usuário", erro);
        }
    }

    async buscarPorId(id: string): Promise<Usuario | null> {
        try {
            const usuarioPrisma = await prisma.user.findUnique({ where: { id } });

            if (!usuarioPrisma) {
                return null;
            }

            return new Usuario(
                usuarioPrisma.id,
                usuarioPrisma.name,
                usuarioPrisma.email,
                usuarioPrisma.role as PapelUsuario,
                usuarioPrisma.createdAt
            );
        } catch (erro: unknown) {
            this.tratarErro("buscar usuário por ID", erro);
        }
    }

    private tratarErro(contexto: string, erro: unknown): never {
        let mensagem = "Erro desconhecido";
        
        if (erro instanceof Error) {
            mensagem = erro.message;
        } else if (typeof erro === "string") {
            mensagem = erro;
        }
        
        throw new Error(`Falha ao ${contexto}: ${mensagem}`);
    }
}
