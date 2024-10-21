import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  city: Joi.string().required(),
  exp: Joi.number(),
  stream: Joi.string(),
  tel: Joi.string(),
  type: Joi.string().valid('client', 'lawyer'),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
