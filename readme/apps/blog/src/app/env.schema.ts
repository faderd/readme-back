import * as Joi from 'joi';

export default Joi.object({
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

  JWT_SECRET: Joi
    .string()
    .required(),
});
