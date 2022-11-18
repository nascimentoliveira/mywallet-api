import joi from 'joi';

const entrySchema = joi.object({
  value: joi.string().required(),
  description: joi.string().required(),
  type: joi.string().valid('in', 'out').required()
});

export default entrySchema;