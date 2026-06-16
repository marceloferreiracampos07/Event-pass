import { defineConfig } from 'vitest/config';
import path from 'path';
import dotenv from 'dotenv';

// Carrega as variáveis do .env.test explicitamente para o ambiente de teste
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/generated/prisma/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
