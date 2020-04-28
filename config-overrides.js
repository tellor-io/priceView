const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#4caf50',
      '@layout-header-background': '#4caf50',
      '@layout-trigger-background': '#409143',
      '@menu-dark-item-active-bg': '#238C30',
      '@layout-header-height': 0,
    },
  })
)
