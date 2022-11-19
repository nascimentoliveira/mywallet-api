import { Router } from 'express';
import { newEntry, editEntry, deleteEntry } from '../controllers/entry.controller.js';
import { authValidation } from '../middlewares/authValidation.middleware.js';
import { entrySchemaValidation } from '../middlewares/entrySchemaValidation.middleware.js';
import { entryValidation } from '../middlewares/entryValidation.middleware.js';

export const entryRouter = Router();
entryRouter.use(authValidation);
entryRouter.post('/entry', entrySchemaValidation, newEntry);
entryRouter.put('/entry/:id', entrySchemaValidation, entryValidation, editEntry);
entryRouter.delete('/entry/:id', entryValidation, deleteEntry);