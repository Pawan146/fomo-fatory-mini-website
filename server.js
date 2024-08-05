// server.js
const next = require('next');
const http = require('http');
const { parse } = require('url');

// Import the handler from your API route

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, async (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);

    const handler = require('./pages/api/updateData');

    // Call your API handler immediately when the server starts
    await handler();

    // Then set it to be called every 5 seconds
    setInterval(async () => {
     // console.log('Calling updateData API...');
      await handler();
    }, 5000); // 5000 milliseconds = 5 seconds
  });
});