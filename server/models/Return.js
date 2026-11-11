import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  product: { type: String, required: true, trim: true, maxlength: 80 },
  customer: { type: String, required: true, trim: true, maxlength: 60 },
  category: { type: String, required: true, enum: ['Electronics', 'Clothing', 'Footwear', 'Home & Lifestyle'] },
  reason: { type: String, required: true, enum: ['Wrong Size', 'Damaged', 'Poor Quality', 'Not as Described', 'Changed Mind'] },
  date: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Return', returnSchema);
