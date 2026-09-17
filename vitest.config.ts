import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    // O core é TypeScript puro: não depende do DOM nem da rede (design.md §1.1).
    environment: 'node',
    pool: 'forks',
    include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
  },
});
