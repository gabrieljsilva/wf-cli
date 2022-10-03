import * as winston from 'winston';
import { utilities } from 'nest-winston';
import * as LogzioWinstonTransport from 'winston-logzio';
import { ENV } from '../../shared/constants';

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('Nest'),
      ),
    }),
    new LogzioWinstonTransport({
      level: 'info',
      name: 'winston_logzio',
      token: ENV.LOGZIO_TOKEN,
      host: ENV.LOGZIO_HOST,
    }),
  ],
};
