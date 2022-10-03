import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class Env {
  @Expose()
  DB_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  DB_PORT: number;

  @Expose()
  DB_USER: string;

  @Expose()
  DB_PASSWORD: string;

  @Expose()
  DB_NAME: string;

  @Expose()
  REDIS_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  REDIS_PORT: number;

  @Expose()
  APP_EMAIL: string;

  @Expose()
  SMTP_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  SMTP_PORT: number;

  @Expose()
  SMTP_USER: string;

  @Expose()
  SMTP_PASSWORD: string;

  @Expose()
  APP_SECRET: string;

  @Expose()
  APP_PROTOCOL: 'http' | 'https';

  @Expose()
  APP_HOST: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  APP_PORT: number;

  @Expose()
  FIREBASE_PROJECT_ID: string;

  @Expose()
  @Transform(({ value }) => value.replace(/\\n/g, '\n'))
  FIREBASE_PRIVATE_KEY: string;

  @Expose()
  FIREBASE_CLIENT_EMAIL: string;

  @Expose()
  ORIGIN_EMAIL: string;

  @Expose()
  LOGZIO_TOKEN: string;

  @Expose()
  LOGZIO_HOST: string;
}
