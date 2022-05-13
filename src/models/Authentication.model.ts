import mongoose from 'mongoose';

const authenticationSchema = new mongoose.Schema(
  {
    partner: { type: String, required: true },
    key: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

export default mongoose?.models?.Authentication || mongoose.model('Authentication', authenticationSchema);
