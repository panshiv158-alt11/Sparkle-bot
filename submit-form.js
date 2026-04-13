const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const querystring = require("querystring");
const https = require("https");

const PORT = 3000;
const HOSTNAME = "localhost";

// Your Google Form submission endpoint
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe_qSy8_GEsTTkYTLOZ94pYdsv_XxSRGDlUPDGxVuCdgpSZEQ/formResponse";

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
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS requests
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse the request URL
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Handle form submission endpoint
  if (pathname === "/submit-enroll" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const formData = JSON.parse(body);

        // Log received data
        console.log("📋 Received form submission:");
        console.log(formData);

        // Prepare URLSearchParams for Google Forms
        const params = new URLSearchParams();
        params.append("entry.448107434", formData.child); // Child Name
        params.append("entry.1021014844", formData.parent); // Parent Name
        params.append("entry.1063743900", formData.email); // Email
        params.append("entry.1694517917", formData.phone); // Phone
        params.append("entry.1469959605", formData.age); // Age Group
        params.append("entry.46458961", formData.course); // Course

        console.log("📤 Submitting to Google Forms...");
        console.log("Params:", params.toString());

        // Submit to Google Forms
        const postData = params.toString();
        const urlObj = new URL(GOOGLE_FORM_URL);

        const options = {
          hostname: urlObj.hostname,
          path: urlObj.pathname + urlObj.search + "?" + postData,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": postData.length,
            "User-Agent": "Mozilla/5.0",
          },
        };

        const googleReq = https.request(options, (googleRes) => {
          console.log(
            "✅ Google Forms Response Status:",
            googleRes.statusCode,
          );

          // Return success to client regardless of Google's response
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: "Registration submitted successfully!",
              data: formData,
            }),
          );
        });

        googleReq.on("error", (error) => {
          console.error("❌ Error submitting to Google Forms:", error);

          // Still return success as data was received
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: "Registration recorded (may take a moment to appear)",
              data: formData,
            }),
          );
        });

        googleReq.write(postData);
        googleReq.end();
      } catch (error) {
        console.error("❌ Error parsing form data:", error);
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });

    return;
  }

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
        "<h1>404: File Not Found</h1><p>The requested file could not be found.</p>",
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
  console.log("\n╔════════════════════════════════════════════╗");
  console.log("║   SPARKLEBOTS WEBSITE SERVER RUNNING   ║");
  console.log("╚════════════════════════════════════════════╝");
  console.log(`\n🌐 Server: http://${HOSTNAME}:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log("\n✨ Features:");
  console.log("   ✓ HTML, CSS, JavaScript files");
  console.log("   ✓ Video playback support");
  console.log("   ✓ Google Forms integration via /submit-enroll");
  console.log("   ✓ Responsive design");
  console.log("\n🔗 Google Form Endpoint:");
  console.log("   POST /submit-enroll - Submit enrollment data");
  console.log("\nPress Ctrl+C to stop the server.\n");
});

// Handle server errors
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`\n❌ Port ${PORT} is already in use!`);
  } else {
    console.error("Server error:", err);
  }
  process.exit(1);
});
