import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: path.resolve(__dirname, '../../../../.env.test') });
} else {
    dotenv.config();
}

const {
    PORT,
    DATABASE_URL,
    REDIS_URL,
    JWT_SECRET,
    NODE_ENV
} = process.env;

export const configuracao = {
    porta: PORT,
    bancoDadosUrl: DATABASE_URL,
    redisUrl: REDIS_URL,
    jwtSegredo: JWT_SECRET,
    ambiente: NODE_ENV || 'development'
};

export const validarConfiguracao = (): void => {
    const camposObrigatorios = [
        'PORT',
        'DATABASE_URL',
        'REDIS_URL',
        'JWT_SECRET'
    ];

    for (const campo of camposObrigatorios) {
        if (process.env[campo] === undefined) {
            throw new Error(`ERRO DE CONFIGURAÃ‡ÃƒO CRÃTICO: A variável ${campo} não foi definida no arquivo .env`);
        }
    }
};

