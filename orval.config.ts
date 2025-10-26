import { defineConfig } from 'orval';

export default defineConfig({
  main: {
    input: 'api.yml',
    output: {
      target: './src/api/generated',
      schemas: './src/api/generated/model',
      prettier: true,
      client: 'react-query',
      mode: 'tags',
      override: {
        mutator: {
          path: './src/api/instance.ts',
          name: 'apiInstance',
        },
      },
    },
  },
});
