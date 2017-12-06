import rollup      from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify';

//paths are relative to the execution path
export default {
    entry: 'app/scripts/boot/main-aot.js',
    dest: 'dist/js/build.js', // output a single application bundle
    sourceMap: true,
    sourceMapFile: 'dist/js/build.js.map',
    format: 'iife',
    plugins: [
        nodeResolve({jsnext: true, module: true}),
        commonjs({
            include: ['node_modules/rxjs/**']
        }),
        uglify()
    ]
}