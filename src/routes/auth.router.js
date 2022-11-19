import { Router } from 'express';
import { signUp, signIn } from '../controllers/user.controller.js';
import { signInValidation } from '../middlewares/signInValidation.middleware.js';
import { signUpValidation } from '../middlewares/signUpValidation.middleware.js';
import { userSchemaValidationSignIn, userSchemaValidationSignUp } from '../middlewares/userSchemaValidation.middleware.js';

export const authRouter = Router();
authRouter.post('/',userSchemaValidationSignIn, signInValidation, signIn);
authRouter.post('/signup', userSchemaValidationSignUp, signUpValidation, signUp);