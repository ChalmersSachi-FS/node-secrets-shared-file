const http = require("http");
const fs = require("fs");

let secrets;

try {
  const raw = fs.readFileSync("./secrets.json", "utf8");
  secrets = JSON.parse(raw);
} catch (err) {
  console.error("Missing secrets.json file!");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Secrets shared-file app running.");
    return;
  }

  if (req.url === "/show-secrets") {
    res.end(
      `Loaded secrets:\nAPI_KEY=${secrets.API_KEY}\nDB_PASS=${secrets.DB_PASSWORD}`
    );
    return;
  }

  res.statusCode = 404;
  res.end("Not found");
});

server.listen(3000, () => console.log("Running on http://localhost:3000"));
