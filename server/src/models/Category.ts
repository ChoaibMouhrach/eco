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
      softDelete: async function () {
        const user = this;
        user.deletedAt = new Date();

        await user.save();
        return user;
      },
    },
  }
);

export default model("Category", categorySchema);
