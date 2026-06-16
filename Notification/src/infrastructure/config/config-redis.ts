import dotenv from 'dotenv';

dotenv.config();
export const configRedis = {
    host: process.env.REDIS_HOST,
    porta: process.env.REDIS_PORT,
    senha: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URL,
    canalBookings: process.env.REDIS_CANAL_BOOKINGS
};
export const validarConfiguracao = (): void => {
    const camposObrigatorios = [
        'REDIS_HOST',
        'REDIS_PORT',
        'REDIS_PASSWORD',
        'REDIS_URL',
        'REDIS_CANAL_BOOKINGS'
    ];

    for (const campo of camposObrigatorios) {
        if (process.env[campo] === undefined) {
            throw new Error(`ERRO DE CONFIGURAÇÃO CRÍTICO: A variável ${campo} não foi definida no .env`);
        }
    }

    if (isNaN(Number(configRedis.porta))) {
        throw new Error(`ERRO DE CONFIGURAÇÃO: A variável REDIS_PORT deve ser um número.`);
    }
};
