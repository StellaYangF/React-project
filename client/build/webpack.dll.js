const path = require('path');
const resolve = (...filename) => path.resolve(__dirname, '../', ...filename);
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
    entry: {
        react: ['react', 'react-dom', 'react-router-dom', 'react-redux','connected-react-router'],
    },
    output: {
        path: resolve('dist', 'dll'),
        filename: '[name].dll.js',
        library: '__dll__[name]',
    },
    plugins: [
        new DllPlugin({
            name: '__dll__[name]',
            path: resolve('dist/dll', '[name].manifest.json'),
        })
    ]
}