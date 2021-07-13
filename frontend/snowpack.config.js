const path = require('path')
const dotenv = require('dotenv')

const result = dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
})

if (result.error) {
  throw result.error
}

module.exports = {
  plugins: [
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
  ],
  packageOptions: {
    polyfillNode: true,
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/build' },
  },
  optimize: {
    bundle: true,
  },
  routes: [{ match: 'routes', src: '/.*', dest: '/index.html' }],
  devOptions: {
    open: 'none',
    port: parseInt(process.env.PORT),
  },
  alias: {
    '@utils': path.join(__dirname, 'src/utils'),
    '@components': path.join(__dirname, 'src/components'),
    '@type': path.join(__dirname, 'src/types'),
    '@assets': path.join(__dirname, 'src/assets'),
  },
  exclude: ['**/node_modules/**/*', '**/*.test.*'],
}
