import { model, Schema } from "mongoose"
import Category from "./Category";

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: Category.modelName
  }],
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default model("Product", productSchema)

