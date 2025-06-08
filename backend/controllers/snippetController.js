import Snippet from '../models/snippet.js';
import { generateShortId, generateDeleteKey } from '../utils/generateId.js';

export const createSnippet = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required.' });
    }

    let shortId, existing;
    do {
      shortId = generateShortId();
      existing = await Snippet.findOne({ shortId });
    } while (existing);

    const deleteKey = generateDeleteKey();

    const snippet = new Snippet({ content, shortId, deleteKey });
    await snippet.save();

    res.status(201).json({
      url: `${req.protocol}://${req.get('host')}/snippets/${shortId}`,
      deleteKey,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSnippet = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const snippet = await Snippet.findOne({ shortId: id });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }
    const { content, createdAt } = snippet;
    res.json({ content, createdAt });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteSnippet = async (req, res) => {
  try {
    const id = req.params.id.trim();
    const { deleteKey } = req.body;
    if (!deleteKey) {
      return res.status(400).json({ message: 'Delete key is required.' });
    }

    const snippet = await Snippet.findOne({ shortId: id });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found.' });
    }
    if (snippet.deleteKey !== deleteKey) {
      return res.status(403).json({ message: 'Invalid delete key.' });
    }

    await snippet.deleteOne();
    res.json({ message: 'Snippet deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
