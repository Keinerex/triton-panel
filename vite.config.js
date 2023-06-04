import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
    plugins: [vue(), svgLoader()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                @import "@/assets/scss/_mixins.scss";
                @import "src/assets/scss/_fonts.scss";
                @import "@/assets/scss/_variables.scss";
                @import "@/assets/scss/_sizes.scss";
                `
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
