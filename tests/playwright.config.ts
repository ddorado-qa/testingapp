import { defineConfig, devices } from '@playwright/test';

const common = {
  retries: 0,
  reporter: [['list']],
  timeout: 10000,
  use: {
    baseURL: 'http://frontend:5173',
    trace: 'retain-on-failure',
    video: 'on',
    screenshot: 'on',
    headless: true
  },
  outputDir: 'tests/test-results',
  globalSetup: 'tests/global-setup.js',
};

export default defineConfig({
  // Definimos múltiples proyectos con rutas de testDir distintas
  projects: [
    {
      name: 'e2e-chromium',
      testDir: 'tests/e2e',
      ...common,
      use: {
        ...common.use,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'e2e-pixel5',
      testDir: 'tests/e2e',
      ...common,
      use: {
        ...common.use,
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'rapidos-chromium',
      testDir: 'e2r/rapidos',
      ...common,
      use: {
        ...common.use,
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'rapidos-pixel5',
      testDir: 'e2r/rapidos',
      ...common,
      use: {
        ...common.use,
        ...devices['Pixel 5'],
      },
    }
  ]
});