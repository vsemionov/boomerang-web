import replace from 'rollup-plugin-replace';
import alias from 'rollup-plugin-alias';
import vue from 'rollup-plugin-vue';
import json from 'rollup-plugin-json';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import nodeGlobals from 'rollup-plugin-node-globals';
import uglify from 'rollup-plugin-uglify';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const plugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
    alias({
        vue$: 'vue/dist/vue.esm.js'
    }),
    vue({
        css: './www/boomerang.css'
    }),
    json(),
    buble({
        objectAssign: 'Object.assign'
    }),
    nodeResolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    commonjs(),
    nodeGlobals()
];

const config = {
    input: './src/main.js',
    output: {
        file: './www/boomerang.js',
        format: 'iife'
    },
    sourcemap: true,
    plugins: plugins
};

const isProduction = process.env.NODE_ENV === `production`;
const isDevelopment = process.env.NODE_ENV === `development`;

if (isProduction) {
    config.sourcemap = false;
    config.plugins.push(uglify());
}

if (isDevelopment) {
    config.plugins.push(livereload());
    config.plugins.push(serve({
        contentBase: './www/',
        port: 8080,
        open: true,
        historyApiFallback: true
    }));
}

export default config;
