import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    image: {
      type: String,
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    methods: {
      softDelete: async function() {
        const category = this;
        category.deletedAt = new Date();

        await category.save();
        return category;
      },
    },
  }
);

export default model("Category", categorySchema);
