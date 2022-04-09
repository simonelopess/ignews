module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "./next/"],
    //executa antes do jest executa os testes
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: 'jsdom'
}