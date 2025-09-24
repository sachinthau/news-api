import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

const logger = isDev
  ? pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    })
  : pino();

export default logger;