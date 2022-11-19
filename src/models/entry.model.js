import joi from 'joi';

export const entrySchema = joi.object({
  value: joi.number().greater(0).required(),
  description: joi.string().required(),
  type: joi.string().valid('in', 'out').required()
});