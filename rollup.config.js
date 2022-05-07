import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

export default {
    input: [
        'src/index.js'
    ],
    output: [
        {file: pkg.module, format: 'iife', name: 'DatePicker'},
        {file: pkg.main, format: 'iife', name: 'DatePicker'},
    ],
    plugins: [
        svelte({
            customElement: true,
            tag: null,
            emitCss: true,
            css: (css) => {
                css.write('dist/build/date-picker.css');
            }
        }),
        resolve({
                extensions: ['.svelte', '.mjs', '.js', '.jsx', '.json'],
                mainFields: ['jsnext:main', 'module', 'main']
            }
        )
    ]
};
