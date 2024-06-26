import { PrismaClient } from "@prisma/client";
import { global } from "styled-jsx/css";

// creating a singleton prisma client object
const primsaClientSingleton = () => {
  return new PrismaClient();
};

// no we will create a primsaGlobal property(can be anything db for ex.) on global this

// global this contain all the properties of global and prismaGlobal

declare const globalThis: {
  prismaGlobal: ReturnType<typeof primsaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? primsaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;

/**
 * we do this for development environment because in next js there is a concept of hot reload and every time we save a file next js will create an instance of prisma client and it will give us some error. It will initialise prisma client only one time in dev. We are storing this in globathis because global this is not affected by hot reload.
 */
