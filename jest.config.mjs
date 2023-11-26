import nextJest from 'next/jest.js'
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // moduleDirectories: ['node_modules', '<rootDir>/'],
  // moduleNameMapper: {
  //   "react-markdown": "<rootDir>/node_modules/react-markdown/react-markdown.min.js",
  // },
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|mjs)$",
  // transform: {
  //   '^.+\\.[t|j]sx?$': 'babel-jest',
  // },
  // transformIgnorePatterns: [
  //   'node_modules/(?!react-markdown/).+\\.js$'
  // ],
  testEnvironment: 'jest-environment-jsdom',
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
