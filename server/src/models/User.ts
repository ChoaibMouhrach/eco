import { Schema, model } from "mongoose";
import RefreshToken from "./RefreshToken";
import { User as UserType } from "../types/auth";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    refreshTokens: [
      {
        type: Schema.Types.ObjectId,
        ref: RefreshToken.modelName,
      },
    ],
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
      prepare: function () {
        let user = this.toObject() as UserType & {
          password?: string;
          refreshTokens?: string[];
        };

        delete user.password;
        delete user.refreshTokens;

        return user;
      },
    },
  }
);

export default model("User", userSchema);
