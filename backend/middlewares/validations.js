const { z } = require('zod');
const { BadRequestError } = require('../errors/customError');
const { isValidObjectId } = require('mongoose');

const validateWithZodSchema = (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new BadRequestError(errors.join(', '));
  }

  return result.data;
};

// menu item schema
const addItemSchema = z.object({
  name: z
    .string({
      required_error: 'Please provide menu item name',
    })
    .min(3, { message: 'Name must be atleast 3 characters' }),
  price: z
    .number({ required_error: 'Please provide menu item price' })
    .min(10, { message: 'Price must be atleast 10' }),
  category: z
    .enum(['appetizers', 'main course', 'desserts', 'others'])
    .optional(),
  availability: z.boolean().optional(),
});

// validate add item inputs
const validateAddItem = (data) => {
  return validateWithZodSchema(addItemSchema, data);
};

// update item schema
const updatItemSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be atleast 3 characters' })
    .optional(),
  price: z.number().min(10, { message: 'Price must be atleast 10' }).optional(),
  category: z
    .enum(['appetizers', 'main course', 'desserts', 'others'])
    .optional(),
  availability: z.boolean().optional(),
});

// validate update item inputs
const validateUpdateItem = (data) => {
  return validateWithZodSchema(updatItemSchema, data);
};

// validate database id
const validateMongoId = (id) => {
  const isValid = isValidObjectId(id);
  if (!isValid) throw new BadRequestError('Invalid MongoDB id');
  return isValid;
};

module.exports = {
  validateAddItem,
  validateMongoId,
  validateUpdateItem,
};
