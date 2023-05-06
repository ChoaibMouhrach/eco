import { Schema, model } from "mongoose";
import { UserDocument } from "../interfaces/User";

const userSchema = new Schema<UserDocument>(
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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      required: true
    },
    birthDay: {
      type: Date,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
    forgotPasswordTokens: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    confirmEmailTokens: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
    refreshTokens: [
      {
        token: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    methods: {
      softDelete: async function() {
        const user = this;
        user.deletedAt = new Date();
        await user.save();
        return user;
      },
      prepare: function() {
        let user = this.toObject() as {
          password?: string;
          refreshTokens?: string[];
          forgotPasswordTokens?: string[];
          confirmEmailTokens?: string[];
        };

        delete user.password;
        delete user.refreshTokens;
        delete user.forgotPasswordTokens;
        delete user.confirmEmailTokens;

        return user;
      },
    },
  }
);

export default model<UserDocument>("User", userSchema);
