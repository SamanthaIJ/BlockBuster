module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
    },
    transformIgnorePatterns: [
        'node_modules/(?!.*\\.mjs$)', 
    ],
    moduleFileExtensions: ['ts', 'mjs', 'js', 'html'],
    moduleNameMapper: {
        '\\.(scss|css|html)$': '<rootDir>/src/__mocks__/styleMock.js', // Mock styles and templates
    },
};