require("dotenv").config();

const server = require("./api/server");

const PORT = process.env.PORT || 9000;

server.get("/api/hello", (req, res) => {
  res.json({ message: "api is working" });
});

server.use("*", (req, res) => {
  res.send(`<h1>Hello, you got this far!</h1>`);
});

server.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
