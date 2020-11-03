const {
  override,
  fixBabelImports,
  addDecoratorslegacy,
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addDecoratorslegacy()
);
