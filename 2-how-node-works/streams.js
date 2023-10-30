const fs = require("fs");
const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  // Solution 1: Read the whole file and send it
  //   const fileContent = fs.readFileSync("./test-file.txt", "utf-8");
  //   res.end(fileContent);

  // Solution 2: Streams
//   const readStream = fs.createReadStream("./test-file.txt");

//   readStream.on("data", (chunk) => {
//     console.log(chunk);
//     res.write(chunk);
//   });

//   readStream.on("end", () => {
//     res.end();
//   });

//   readStream.on("error", (err) => {
//     console.log(err);
//     res.statusCode = 500;
//     res.end("File not found!");
//   });

    // Solution 3: Pipe operator
    const readStream = fs.createReadStream("./test-file.txt");
    readStream.pipe(res)
});

server.listen("8000", "127.0.0.1", () => {
  console.log("Server is listening on port 8000...");
});
