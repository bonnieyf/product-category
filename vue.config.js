var ImageminPlugin = require("imagemin-webpack-plugin").default;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => {
        options.fallback.options.name = "img/[name].[ext]";
        return options;
      });
  },
  configureWebpack: {
    plugins: [
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        disable: process.env.NODE_ENV !== "production",
        pngquant: {
          quality: "70",
        },
      }),
    ],
  },
  productionSourceMap: false,
};
