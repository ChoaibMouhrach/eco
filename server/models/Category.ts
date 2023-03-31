import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  image: String
})

export default model("Category", categorySchema)
