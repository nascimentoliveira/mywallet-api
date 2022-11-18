import joi from 'joi';

const entrySchema = joi.object({
  value: joi.number().greater(0),
  description: joi.string().required(),
  type: joi.string().valid('in', 'out').required()
});

export default entrySchema;