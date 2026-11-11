import { Router } from 'express';
import mongoose from 'mongoose';
import Return from '../models/Return.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
const fields = ['product', 'customer', 'category', 'reason', 'date', 'status'];
const serialize = (doc) => ({ id: doc._id.toString(), product: doc.product, customer: doc.customer, category: doc.category, reason: doc.reason, date: doc.date, status: doc.status, createdAt: doc.createdAt, updatedAt: doc.updatedAt });
function pickFields(body) {
  return Object.fromEntries(fields.filter((key) => body[key] !== undefined).map((key) => [key, body[key]]));
}
router.get('/', async (req, res) => {
  const docs = await Return.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json({ data: docs.map(serialize) });
});
router.post('/', async (req, res) => {
  const data = pickFields(req.body);
  const doc = await Return.create({ ...data, owner: req.user._id });
  res.status(201).json({ data: serialize(doc) });
});
router.patch('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid return ID.' });
  const doc = await Return.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, { $set: pickFields(req.body) }, { new: true, runValidators: true });
  if (!doc) return res.status(404).json({ message: 'Return record not found.' });
  res.json({ data: serialize(doc) });
});
router.delete('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid return ID.' });
  const doc = await Return.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!doc) return res.status(404).json({ message: 'Return record not found.' });
  res.json({ message: 'Return record deleted.' });
});
export default router;
