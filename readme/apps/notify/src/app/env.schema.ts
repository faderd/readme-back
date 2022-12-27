import * as Joi from 'joi';

const DEFAULT_MONGO_DB_PORT = 27018;
const DEFAULT_SMTP_PORT = 465;

export default Joi.object({
  MONGO_DB: Joi
    .string()
    .required(),
  MONGO_HOST: Joi
    .string()
    .hostname()
    .required(),
  MONGO_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_MONGO_DB_PORT)
    .required(),
  MONGO_USER: Joi
    .string()
    .required(),
  MONGO_PASSWORD: Joi
    .string(),
  MONGO_AUTH_BASE: Joi
    .string()
    .required(),

  RABBIT_USER: Joi
    .string()
    .required(),
  RABBIT_PASSWORD: Joi
    .string(),
  RABBIT_HOST: Joi
    .string()
    .uri()
    .required(),
  RABBIT_NOTIFY_SERVICE_QUEUE: Joi
    .string()
    .required(),

  SMTP_HOST: Joi
    .string()
    .hostname()
    .required(),
  SMTP_PORT: Joi
    .number()
    .port()
    .default(DEFAULT_SMTP_PORT)
    .required(),
  SMTP_SECURE: Joi
    .bool()
    .default(false),
  SMTP_USER: Joi
    .string(),
  SMTP_PASS: Joi
    .string(),
});
