module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testRegex: 'test/(.+)\\.test\\.(tsx?)$',
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    // 转换过程中，需要被忽略的文件。
    "transformIgnorePatterns": [
        "<rootDir>/node_modules/(moment|core-js|babel-runtime|regenerator-runtime|lodash)/"
    ],
    // 是否搜集单测覆盖率信息。
    // "collectCoverage": true,
    "testPathIgnorePatterns": [
        "/(node_modules|lib|coverage|types)/"
    ],
    moduleFileExtensions: ['ts', 'tsx',
        'js', 'jsx',
        'json', 'node'],
};
