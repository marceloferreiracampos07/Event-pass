import argon2 from "argon2";
import { IPasswordHasher } from "../../Domain/service/IPasswordHasher";

export class Argon2PasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        if (!hash || typeof hash !== 'string' || !hash.startsWith('$argon2')) {
            return false;
        }

        try {
            return await argon2.verify(hash, password);
        } catch {
            return false;
        }
    }
}