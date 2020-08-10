const { override, useEslintRc, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    ['@src']: path.resolve(__dirname, 'src'),
    ['@enums']: path.resolve(__dirname, 'src/common/enums'),
    ['@helpers']: path.resolve(__dirname, 'src/common/helpers'),
    ['@models']: path.resolve(__dirname, 'src/common/models'),
    ['@types']: path.resolve(__dirname, 'src/common/types')
  }),
  useEslintRc(path.resolve(__dirname, '.eslintrc'))
);
