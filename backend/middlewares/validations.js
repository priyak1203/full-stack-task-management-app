const { z, string } = require('zod');
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

/* ====================================================================== 
    AUTH INPUT VALIDATIONS
========================================================================== */
const registerUserSchema = z.object({
  username: z
    .string({ required_error: 'Please provide username' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must not be more than 20 characters' }),
  password: z
    .string({ required_error: 'Please provide password' })
    .min(6, { message: 'Password must be at least 6 characters' }),
});

const validateRegisterUserInput = (data) => {
  return validateWithZodSchema(registerUserSchema, data);
};

const loginUserSchema = z.object({
  username: z.string({ required_error: 'Please enter username' }),
  password: z.string({ required_error: 'Please enter password' }),
});

const validateLoginUserInput = (data) => {
  return validateWithZodSchema(loginUserSchema, data);
};

/* ====================================================================== 
    MENU INPUT VALIDATIONS
========================================================================== */

// menu item schema
const addItemSchema = z.object({
  name: z
    .string({
      required_error: 'Please provide menu item name',
    })
    .min(3, { message: 'Name must be at least 3 characters' }),
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

/* ====================================================================== 
    ORDER INPUT VALIDATIONS
========================================================================== */

const singleOrderItemSchema = z.object({
  menuItemId: z.string({ required_error: 'Missing menu item id' }),
  quantity: z
    .number({ required_error: 'Missing quantity value' })
    .min(0, { message: 'Quantity must be at least 0' }),
});

const validateSingleOrderItem = (data) => {
  return validateWithZodSchema(singleOrderItemSchema, data);
};

const validateOrderItems = (items) => {
  const itemsList = items.map((item) => {
    const singleItem = validateSingleOrderItem(item);
    validateMongoId(item.menuItemId);
    return singleItem;
  });

  return itemsList;
};

module.exports = {
  validateAddItem,
  validateMongoId,
  validateUpdateItem,
  validateRegisterUserInput,
  validateLoginUserInput,
  validateOrderItems,
};
