import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
// import { dependencies } from './package.json';
import eslint from 'vite-plugin-eslint';


// const lib_chunks = {
//   '@emotion': 'libs',
//   '@mui/icons-material': 'mui',
//   '@mui/material': 'mui',
//   '@mui/styled-engine': 'mui-grid',
//   '@mui/x-data-grid': 'mui-grid',
//   '@mui/x-tree-view': 'mui',
//   '@popperjs': 'libs',
//   'bootstrap': 'mui-grid',
//   'chartjs': 'chartjs',
//   'chart.js': 'chartjs',
//   'file-saver': 'libs',
//   'react-ga4': 'libs',
//   'sass': 'libs',
//   'underscore': 'libs'
// }

const lib_chunks = {
	'bootstrap': ['bootstrap', 'react-bootstrap', 'react-bootstrap-icons'],
	'chartjs': ['chartjs', 'chart.js', 'chartjs-plugin-annotation', 'chartjs-plugin-datalabels', 'react-chartjs-2'],
	'libs': ['globals', '@emotion', '@popperjs', 'file-saver', 'react-ga4', 'react-helmet', 'sass', 'underscore'],
	'mui': ['@mui/icons-material', '@mui/material', '@mui/x-tree-view'],
	'mui-grid': ['@mui/styled-engine', '@mui/x-data-grid'],
	'vendor': ['react', 'react-router', 'react-dom']
}


const build_code_splitting_groups = () => {
	// node_modules
	const lib_group_names = Object.keys(lib_chunks);
	let lib_groups = []
	for (let i=0; i<lib_group_names.length; i++) {
		const group_name = lib_group_names[i];
		const group = {
			name: group_name,
            test: '/node_modules/'+lib_chunks[group_name].join('|')
		}
		lib_groups.push(group)
	}

	// src/components
	const components_group = {
		name: 'components',
		test: '/src/components/table|ancestry'
	}
	lib_groups.push(components_group)

	// - TESTS - //
	// const components = ['table','ancestry']
	// for (let j=0; j<components.length; j++) {
	// 	const name = components[j]
	// 	const component_group = {
	// 		name: name,
	// 		test: '/src/components/'+name
	// 	}
	// 	lib_groups.push(component_group)
	// }
	// const browse_group = {
	// 	name: 'browse',
	// 	test: '/src/pages/Browse'
	// }
	// lib_groups.push(browse_group)

	return lib_groups
}


// Remove potentially critical env variables so they are not callable/visible in the App
const cleanup_project_env = (mode) => {
	let app_env = loadEnv(mode, process.cwd(), '')
	delete app_env.PATH;
	const constant_keys = Object.keys(app_env);
	const keys_to_skip = [
		'_CWD','_EXE','ENCODING','KEY','PASS','PASSWORD','PROGRAM',
		'PWD','SECURITY','SESSION_ID','SESSIONID','SCRIPT','SSH'
	]
	for (let i=0; i<=constant_keys.length; i++){
		const constant = constant_keys[i];
		if (!constant) {
			continue;
		}
		const constant_uc = constant.toUpperCase();
		for (let j=0; j<=keys_to_skip.length; j++) {
			if (constant_uc.includes(keys_to_skip[j])) {
				delete app_env[constant];
			}
		}
	}
	return app_env;
}


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	return {
		define: {
			'process.env': cleanup_project_env(mode)
		},
		plugins: [
			react(),
			eslint()
		],
		server: {
			port: 3000,
			hot: true
		},
		// Allow to use/load the SCSS file _variables.scss
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "/src/styles/_variables.scss" as *;`
				}
			}
		},
		build: {
			sourcemap: false,
			rollupOptions: {
				output: {
					codeSplitting: {
						groups: build_code_splitting_groups()
					}
					// manualChunks: {
					//   vendor: react_libs_list,
					//   ...renderChunks(dependencies),
					// }
				}
			}
		}
	}
})