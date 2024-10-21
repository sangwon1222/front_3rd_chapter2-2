import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import path from 'path';

export default mergeConfig(
  defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@refactor': path.resolve(__dirname, 'src/refactoring'),
        '@atoms': path.resolve(__dirname, 'src/refactoring/components/atoms'),
        '@molecules': path.resolve(
          __dirname,
          'src/refactoring/components/molecules'
        ),
        '@templates': path.resolve(
          __dirname,
          'src/refactoring/components/templates'
        ),
        '@pages': path.resolve(__dirname, 'src/refactoring/components/pages'),

        '@provider': path.resolve(__dirname, 'src/refactoring/provider'),
        '@hooks': path.resolve(__dirname, 'src/refactoring/hooks'),
        '@utils': path.resolve(__dirname, 'src/refactoring/utils'),
      },
    },
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  })
);
