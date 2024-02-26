import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from "@vitejs/plugin-react";
import babel from 'vite-plugin-babel';
export default defineConfig({
    plugins: [
        react(),
        babel(),
        laravel({
            input: ['resources/js/assets/scss/app.scss','resources/js/index.js'],
            refresh: true,
        }),
        
    ],
});
