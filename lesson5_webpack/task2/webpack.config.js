const path = require('path');

module.export = {
    entry: {
        profile: './src/profile/index.js',
        dashboard: './src/dashboard/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'build')
    },
    watch: true
}