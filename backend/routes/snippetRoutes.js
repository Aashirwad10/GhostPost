import express from 'express';
import { createSnippet, getSnippet, deleteSnippet } from '../controllers/snippetController.js';

const router = express.Router();

router.post('/snippets', createSnippet);

router.get('/snippets/:id', getSnippet);

router.delete('/snippets/:id', deleteSnippet);

export default router;
