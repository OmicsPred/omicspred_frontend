import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    // define: {
    //   'process.env.REACT_APP_DOI': JSON.stringify(env.REACT_APP_DOI)
    // },
    plugins: [react(), pluginRewriteAll()],
    server: {
      port: 3000,
      hot: true
    }
  }
})