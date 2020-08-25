import mongoose from 'mongoose'

const customizationSchema = new mongoose.Schema(
  {
    target: { type: String, required: true },
    skin_tones: { type: Array, required: true },
    hair_styles: { type: Array, required: true },
    beard_styles: { type: Array, required: true },
    hair_colors: { type: Array, required: true },
    eye_colors: { type: Array, required: true },
    eyebrow_styles: { type: Array, required: true },
    shirts: { type: Array, required: true },
    glasses: { type: Array, required: true },
    css: { type: String, default: '' },
    config: { type: Object, required: true },
    animation_shapes: { type: Array, required: true }
  },
  {
    timestamps: true
  }
)

export default mongoose?.models?.Customization || mongoose.model('Customization', customizationSchema)
