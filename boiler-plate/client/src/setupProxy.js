const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true
      //ws: true
    })
  );
  // app.use(
  //   "/server",
  //   createProxyMiddleware({
  //     target: "http://localhost:9000",
  //     changeOrigin: true,
  //     ws: true
  //   })
  // );
};
