const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = 3000;
const HOSTNAME = "localhost";

// MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Default to index.html for root path
  if (pathname === "/") {
    pathname = "/index.html";
  }

  // Get the file extension
  const ext = path.extname(pathname).toLowerCase();

  // Build the file path
  let filePath = path.join(__dirname, pathname);

  // Security: prevent directory traversal attacks
  const realPath = path.resolve(__dirname, pathname);
  if (!realPath.startsWith(__dirname)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403: Forbidden");
    return;
  }

  // Check if file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // File not found
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(
        "<h1>404: File Not Found</h1><p>The requested file could not be found.</p>"
      );
      return;
    }

    if (stats.isDirectory()) {
      // Try to serve index.html from directory
      filePath = path.join(filePath, "index.html");
      fs.stat(filePath, (err2) => {
        if (err2) {
          res.writeHead(403, { "Content-Type": "text/plain" });
          res.end("403: Forbidden - No index.html in directory");
          return;
        }
        serveFile(filePath, ".html", res);
      });
    } else {
      // Serve the file
      serveFile(filePath, ext, res);
    }
  });
});

function serveFile(filePath, ext, res) {
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500: Internal Server Error");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
}

server.listen(PORT, HOSTNAME, () => {
  console.log("\n╔════════════════════════════════════════╗");
  console.log("║   SPARKLEBOTS WEBSITE SERVER RUNNING   ║");
  console.log("╚════════════════════════════════════════╝\n");
  console.log(`🚀 Server is running at http://${HOSTNAME}:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log("\n✨ Features:");
  console.log("   ✓ HTML, CSS, JavaScript files");
  console.log("   ✓ Video playback support (.mp4, .webm, .mov, .avi)");
  console.log("   ✓ Automatic QR code generation");
  console.log("   ✓ Responsive design");
  console.log("\n📹 Make sure your video files are in this folder:");
  console.log("   - WhatsApp Video 2026-04-01 at 11.41.18 PM.mp4");
  console.log("   - WhatsApp Video 2026-04-01 at 11.42.57 PM.mp4");
  console.log("   - WhatsApp Video 2026-04-01 at 11.43.13 PM.mp4");
  console.log("\n   Or run copy_videos.bat to copy them automatically.\n");
  console.log("Press Ctrl+C to stop the server.\n");
});

// Handle server errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error("   Either close the other application using this port");
    console.error("   or change the PORT variable in server.js\n");
  } else {
    console.error("Server error:", err);
  }
});
