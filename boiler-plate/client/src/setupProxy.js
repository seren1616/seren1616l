const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true
      //ws: true
      //target: "http://localhost:9000", go to spring boot server
    })
  );
  app.use(
    "/server",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true,
      ws: true
    })
  );
};
