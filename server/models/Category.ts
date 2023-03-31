import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
}, {
  methods: {
    softDelete: async function() {
      const user = this;
      user.deletedAt = new Date()

      await user.save()
      return user
    }
  }
})

export default model("Category", categorySchema)
