import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { dependencies } from './package.json';
import eslint from 'vite-plugin-eslint';

const lib_chunks = {
  // '@emotion': 'emotion',
  '@emotion': 'libs',
  '@mui/icons-material': 'mui',
  '@mui/material': 'mui',
  '@mui/styled-engine': 'mui',
  '@mui/x-data-grid': 'mui-grid',
  // '@mui': 'mui',
  // '@popperjs': 'popperjs',
  '@popperjs': 'libs',
  'bootstrap': 'bootstrap',
  'chartjs': 'chartjs',
  'chart.js': 'chartjs',
  'sass': 'libs',
  'underscore': 'libs',
  'file-saver': 'libs'
}

const react_libs_list = ['react', 'react-router', 'react-dom'];

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
      if (react_libs_list.includes(key)) return;
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
    plugins: [react(),eslint()],
    server: {
      port: 3000,
      hot: true
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: react_libs_list,
            ...renderChunks(dependencies),
          },
        },
      },
    }
  }
})