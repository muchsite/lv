const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("server/index.json"); // Path to JSON file
const middlewares = jsonServer.defaults();

const PORT = process.env.REACT_APP_API_URL || 3001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
