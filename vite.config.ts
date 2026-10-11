import path from 'path';
import { defineConfig, Plugin } from 'vite';
import fs from 'fs';

function nikiMpaPlugin(): Plugin {
  return {
    name: 'niki-mpa-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();
        const url = new URL(req.url, 'http://localhost:3000');
        const pathname = url.pathname.replace(/\/$/, ''); // strip trailing slash

        // Static assets and internal Vite files
        if (
          pathname.startsWith('/assets') ||
          pathname.startsWith('/@') ||
          pathname.startsWith('/src') ||
          pathname.includes('.')
        ) {
          return next();
        }

        // Aliases
        if (pathname === '/cli') {
          req.url = '/extension/index.html' + url.search;
          return next();
        }

        // 404 capture routes per spec: /about, /blog, /features, /docs
        if (['/about', '/blog', '/features', '/docs'].includes(pathname)) {
          const content = fs.readFileSync(path.resolve(__dirname, '404.html'), 'utf-8');
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end(content);
          return;
        }

        // Dynamic /sandbox/:slug or /website/:slug redirect or detail
        if (pathname.startsWith('/sandbox/') || pathname.startsWith('/website/')) {
          const slug = pathname.replace('/sandbox/', '').replace('/website/', '');
          if (slug === 'rust-actix' || slug === 'neu-team' || slug === 'studio-a') {
            req.url = '/website/neu-team/index.html' + url.search;
            return next();
          } else {
            // Unknown slugs redirect to /explore (sandboxes)
            res.statusCode = 302;
            res.setHeader('Location', '/explore');
            res.end();
            return;
          }
        }

        // Dynamic /analyze/:slug redirect or detail
        if (pathname.startsWith('/analyze/')) {
          const slug = pathname.replace('/analyze/', '');
          if (slug === 'buttermax-net' || slug === 'studio-a') {
            req.url = '/analyze/buttermax-net/index.html' + url.search;
            return next();
          } else {
            res.statusCode = 302;
            res.setHeader('Location', '/analyze');
            res.end();
            return;
          }
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [nikiMpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          explore: path.resolve(__dirname, 'explore/index.html'),
          pricing: path.resolve(__dirname, 'pricing/index.html'),
          extension: path.resolve(__dirname, 'extension/index.html'),
          analyze: path.resolve(__dirname, 'analyze/index.html'),
          analyzeDetail: path.resolve(__dirname, 'analyze/buttermax-net/index.html'),
          websiteDetail: path.resolve(__dirname, 'website/neu-team/index.html'),
          canvas: path.resolve(__dirname, 'canvas/index.html'),
          mcp: path.resolve(__dirname, 'mcp/index.html'),
          changelog: path.resolve(__dirname, 'changelog/index.html'),
          login: path.resolve(__dirname, 'login/index.html'),
          upgrade: path.resolve(__dirname, 'upgrade/index.html'),
          settings: path.resolve(__dirname, 'settings/account/index.html'),
          terms: path.resolve(__dirname, 'terms/index.html'),
          privacy: path.resolve(__dirname, 'privacy/index.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
