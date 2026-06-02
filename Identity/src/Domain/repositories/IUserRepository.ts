import { Usuario } from "../entities/User";

export interface IRepositorioUsuario {
    buscarPorEmail(email: string): Promise<Usuario | null>;
    salvar(usuario: Usuario, senhaHash: string): Promise<void>;
    buscarPorId(id: string): Promise<Usuario | null>;
}
