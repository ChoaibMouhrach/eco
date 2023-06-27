import db from "@src/config/db";
import { User as UserType } from "@prisma/client";
import jwt from "jsonwebtoken";
import config from "@src/config/config";
import { Resource } from "./Resource";

interface ResourceType {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  roleId?: number;
}

interface Tokens {
  access: {
    token: string;
    duration: string;
  };
  refresh: {
    token: string;
    duration: string;
  };
  email: {
    token: string;
    duration: string;
  };
}

export default class User extends Resource<ResourceType, UserType> {
  public tokens: Tokens = {
    access: {
      token: "",
      duration: "15h",
    },
    refresh: {
      token: "",
      duration: "15h",
    },
    email: {
      token: "",
      duration: "15h",
    },
  };

  public constructor(payload?: {
    data?: ResourceType;
    durations?: {
      refreshToken?: string;
      accessToken?: string;
      emailToken?: string;
    };
  }) {
    super({
      firstName: payload?.data?.firstName ?? String(Math.random()),
      lastName: payload?.data?.lastName ?? String(Math.random()),
      email: payload?.data?.email ?? `${Math.random()}@example.com`,
      phone:
        payload?.data?.phone ??
        `+1${
          Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000
        }`,
      address: payload?.data?.address ?? String(Math.random()),
      roleId: payload?.data?.roleId ?? 1,
    });

    if (payload?.durations?.accessToken) {
      this.tokens.access.duration = payload?.durations.accessToken;
    }

    if (payload?.durations?.refreshToken) {
      this.tokens.refresh.duration = payload?.durations.refreshToken;
    }

    if (payload?.durations?.emailToken) {
      this.tokens.email.duration = payload?.durations.emailToken;
    }
  }

  public async checkDB() {
    return await db.user.findUnique({
      where: {
        email: this.data.email,
      },
    });
  }

  public async createDB() {
    const user = await db.user.create({
      data: this.data as Required<ResourceType>,
    });

    this.instance = user;

    this.tokens.access.token = jwt.sign({ id: user.id }, config.SECRET_ACCESS, {
      expiresIn: this.tokens.access.duration,
    });

    this.tokens.refresh.token = jwt.sign(
      { id: user.id },
      config.SECRET_REFRESH,
      {
        expiresIn: this.tokens.refresh.duration,
      }
    );

    this.tokens.email.token = jwt.sign(
      { id: user.id },
      config.SECRET_AUTH_EMAIL,
      {
        expiresIn: this.tokens.email.duration,
      }
    );

    await db.refreshToken.create({
      data: {
        token: this.tokens.refresh.token,
        ip: "",
        userId: user.id,
      },
    });

    return user;
  }

  public async destroy() {
    await db.user.delete({
      where: {
        email: this.data.email,
      },
    });
  }
}
