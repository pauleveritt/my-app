const path = require('path');

module.exports = function (wallaby) {
    process.env.NODE_PATH +=
        path.delimiter +
        path.join(__dirname, 'node_modules') +
        path.delimiter +
        path.join(__dirname, 'node_modules/react-scripts-ts/node_modules');
    require('module').Module._initPaths();

    // Babel needs this
    // create-react-app-typescript does not use this
    // process.env.NODE_ENV = 'development';

    return {
        files: [
            'src/**/*.ts*',
            '!src/**/*.test.ts*'
        ],

        tests: ['src/**/*.test.ts*'],

        env: {
            type: 'node',
            runner: 'node'
        },

        setup: (wallaby) => {
            wallaby.testFramework.configure({
                moduleNameMapper: {
                    '^.+\\.(jpg|jpeg|png|gif|svg)$': require.resolve('react-scripts-ts/config/jest/fileTransform.js'),
                    '^.+\\.css$': require.resolve('react-scripts-ts/config/jest/cssTransform.js')
                }
            });
        },

        testFramework: 'jest'
    };
};
