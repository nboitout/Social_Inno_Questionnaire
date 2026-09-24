import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('public');
const routes = Object.fromEntries(await Promise.all(['config','submit','visit','login','logout','admin'].map(async name => [name, (await import(`../api/${name}.js`)).default])));
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.ico':'image/x-icon', '.woff2':'font/woff2' };
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.status = code => { res.statusCode = code; return res; };
  res.json = value => { res.setHeader('Content-Type','application/json'); res.end(JSON.stringify(value)); };
  try {
    if (url.pathname.startsWith('/api/')) {
      const handler = routes[url.pathname.slice(5)];
      if (!handler) return res.status(404).json({ error: 'Not found' });
      let raw = ''; for await (const chunk of req) { raw += chunk; if (raw.length > 30000) return res.status(413).json({ error: 'Too large' }); }
      req.body = raw; return await handler(req, res);
    }
    const name = url.pathname === '/' ? '/index.html' : url.pathname === '/admin' ? '/admin.html' : decodeURIComponent(url.pathname);
    const file = path.resolve(root, `.${name}`);
    if (!file.startsWith(root + path.sep)) return res.status(403).end();
    const content = await readFile(file);
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream'); res.end(content);
  } catch { res.status(404).end('Not found'); }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Social Inno: http://localhost:${process.env.PORT || 3000} | Admin: /admin`));
