import { Router } from 'express';
import { newEntry, editEntry, deleteEntry } from '../controllers/entryController.js';
import { entrySchemaValidationMiddleware } from '../middlewares/entrySchemaValidationMiddleware.js';

const entryRouter = Router();

entryRouter.post('/entry', entrySchemaValidationMiddleware, newEntry);
entryRouter.put('/entry/:id', entrySchemaValidationMiddleware, editEntry);
entryRouter.delete('/entry/:id', deleteEntry);

export default entryRouter;