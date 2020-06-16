const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../../search-form"),
  //assetsDir: "../../static/SPA",
  //filenameHashing:false,
  configureWebpack: (config) => {
    config.output.filename = 'js/[name].js';
    config.output.chunkFilename = 'js/[name].js';
  },

  chainWebpack: config => {
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: "css/[name].css",
            chunkFilename: "css/[name].css"
          }
        ]);
    }

    config.plugins
      .delete("html")
      .delete("prefetch")
      .delete("preload");
  },
}
