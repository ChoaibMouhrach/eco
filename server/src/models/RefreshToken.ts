import { Schema , model } from "mongoose"

const refreshtokenSchema = new Schema({
  token: String,
})

export default model("RefreshToken", refreshtokenSchema)
