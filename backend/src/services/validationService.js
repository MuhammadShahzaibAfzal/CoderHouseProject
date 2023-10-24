import Joi from "joi";

export const phoneValidationSchema = Joi.string()
  .label("phone")
  .required()
  .regex(/^\+\d{1,4}\d{6,14}$/)
  .message("Invalid phone number format");

export const verifyOTPValidationSchema = Joi.object({
  phone: Joi.string().required(),
  otp: Joi.number().min(1000, 9999).required(),
  hash: Joi.string().required(),
});

export const activationValidationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(2)
    .max(100)
    .required(),
  avatar: Joi.string().optional(),
});
