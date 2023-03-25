import { Schema, models, model } from "mongoose"
import RefreshToken from "./RefreshToken"

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshTokens: [{
    type: Schema.Types.ObjectId,
    ref: RefreshToken.modelName
  }]
})

export default model("User", userSchema)
