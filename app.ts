import express from 'express';
import cookieParser from 'cookie-parser';

// Dynamic configuration file
import config from './config';

// API Routes
import accountRouter from './routes/account';

// Types
import type GlobalObject from 'types/GlobalObject';

// Express app setup
const app = express();

/**
 * Parsers
 */

app.use(express.json());
app.use(express.urlencoded());

/**
 * Load balancer health check
 */

app.get('/ping', (req, res) => res.send('pong'));

const global: GlobalObject = {};

/**
 * Middlewares
 */

app.use((req, res, next) => {
  // CORS
  if (config.allowedOrigins.includes(req.headers.origin!)) res.setHeader('Access-Control-Allow-Origin', req.headers.origin!);

  // https://github.com/expressjs/session/issues/633
  app.set('trust proxy', true);

  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', req.get('Access-Control-Request-Headers')); // https://stackoverflow.com/questions/13146892/cors-access-control-allow-headers-wildcard-being-ignored amazing thing !!!!!
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('strict-transport-security', 'max-age=15552000; includeSubDomains');
  res.header('vary', 'Accept-Encoding');
  res.header('x-content-type-options', 'nosniff');

  res.header('x-download-options', 'noopen');

  res.header('x-frame-options', 'SAMEORIGIN');
  res.header('x-xss-protection', '1; mode=block');

  return next();
});

app.use(cookieParser());

/**
 * Error Handler
 */

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);

  return res.send({
    success: false,
    message: `An internal error occurred.`,
  });
});

/**
 * API Routes
 */

app.use('/api/account', accountRouter(global));

/**
 * Starting the server
 */

const port = process.env.PORT || 3001;

// Starting the server
const server = app.listen(port, () => {
  console.log(`Backend started on port ${port} with env ${process.env.NODE_ENV}.`);
});

/**
 * Process kill SIGTERM
 */
process.on('SIGTERM', () => {
  console.info('Got SIGTERM. Graceful shutdown start', new Date().toISOString());

  // Allow the server to finish any ongoing requests, but tell it to stop
  server.close(() => {
    console.info('HTTP server closed.');

    process.exit(0);
  });

  // Forcefully shut down if not closed within a certain time
  setTimeout(() => {
    console.error('Forcing shutdown due to timeout.');
    process.exit(1);
  }, 10_000);
});
