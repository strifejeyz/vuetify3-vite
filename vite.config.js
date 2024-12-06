import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
    //base: '/wp-content/plugins/1-800-products/',
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),
        vuetify({
            autoImport: true,
        }),
        ViteFonts({
            google: {
                families: [{
                    name: 'Roboto',
                    styles: 'wght@100;300;400;500;700;900',
                }],
            },
        }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: {
        host: 'localhost',
        port: 9000,
    },
    build: {
        rollupOptions: {
            output: {
                format: 'iife', // Wraps everything in a single self-contained function
                name: 'AiLeaseCalc', // A global name for your script
                entryFileNames: '1800AiLeaseCalc.js',
                assetFileNames: '1800AiLeaseCalc.css',
            },
        },
        target: 'es2015', // Compatibility for older browsers
        polyfillDynamicImport: true,
    },
})
