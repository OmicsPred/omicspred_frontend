import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { dependencies } from './package.json';

const lib_chunks = {
  '@emotion': 'emotion',
  // '@mui/icons-material': 'mui-material',
  // '@mui/material': 'mui-material',
  // '@mui/styled-engine': 'mui-other',
  // '@mui/x-data-grid': 'mui-other',
  '@mui': 'mui',
  '@popperjs': 'popperjs',
  'bootstrap': 'bootstrap',
  'chartjs': 'chartjs',
  'chart.js': 'chartjs',
  'sass': 'libs',
  'underscore': 'libs',
  'file-saver': 'libs'
}

function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    console.log("- DEP: "+key);
    let label_found = 0;
    for (const [label, value] of Object.entries(lib_chunks)) {
      if (key.includes(label)) {
        if (!chunks[value]) {
          chunks[value] = [];
        }
        chunks[value].push(key);
        label_found = 1;
        break;
      }
    }
    if (label_found == 0) {
      if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
      if (!chunks[key]) {
        chunks[key] = [];
      }
      chunks[key].push(key);
    }
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
    server: {
      port: 3000,
      hot: true
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-router-dom', 'react-dom'],
            ...renderChunks(dependencies),
          },
        },
      },
    }
  }
})